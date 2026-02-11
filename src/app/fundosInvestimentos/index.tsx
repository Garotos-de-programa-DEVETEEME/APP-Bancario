import { FilterType } from '@/src/@Types/Filter';
import { FundoInvestimento } from '@/src/@Types/fundos';
import { StylesType } from '@/src/@Types/stylesType';
import { NavigationButton } from '@/src/components/Buttons/navigationButton';
import { FundsCard } from '@/src/components/fundCard/fundCard';
import { SearchBar } from '@/src/components/SearchBar/searchBar';
import { StyledText } from '@/src/components/StyledText';
import { useFilters } from '@/src/Context/filterContext';
import { MOCK_FUNDOS } from '@/src/data/fundos';
import { useTheme } from '@/src/hooks/useTheme';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';

interface FundoInvestimentoProps {
  filters?: [FilterType[], FilterType[], FilterType[]];
}

export default function FundoInvestimentoPage({
  filters,
}: FundoInvestimentoProps) {
  const [investmentFunds, setInvestmentFunds] = useState<FundoInvestimento[]>(
    MOCK_FUNDOS.listaFundos,
  ); //TODO : Fetch real data from API or context
  const theme = useTheme();
  const styles = getStyles(theme);

  const [currentExpanded, setCurrentExpanded] = useState(-1); //variavel que controla o fundo expandido com base no seu ID
  const { filters: filtersContext, setFilters } = useFilters();
  const [searchText, setSearchText] = useState('');

  //TODO implementar funcionalidade de pesquisa de texto

  // lógica para o bottom sheet
  const modalizeRef = useRef<Modalize>(null);
  const [selectedFund, setSelectedFund] = useState<FundoInvestimento | null>(
    null,
  );

  const handleProfileCheckRequest = (fund: FundoInvestimento) => {
    setSelectedFund(fund);
    modalizeRef.current?.open();
  };

  const handleNavigateToInvest = () => {
    modalizeRef.current?.close();
    if (selectedFund) {
      router.push({
        pathname: '/fundosInvestimentos/investir',
        params: { fundData: JSON.stringify(selectedFund) },
      });
    }
  };

  const executeFiltering = () => {
    let filteredList = MOCK_FUNDOS.listaFundos;

    // Filtro de Texto
    if (searchText) {
      const lowerSearch = searchText.toLowerCase();
      filteredList = filteredList.filter(
        (fund) =>
          fund.nome.toLowerCase().includes(lowerSearch) ||
          fund.nomeReduzido.toLowerCase().includes(lowerSearch) ||
          fund.tipoFundo.toLowerCase().includes(lowerSearch),
      );
    }

    // Filtros selecionados (Valor e Risco)
    if (filtersContext.some((arr) => arr.length > 0)) {
      const [favoriteFilters, valueFilters, riskFilters] = filtersContext;

      // Se houver filtro de favoritos (id 8) e não temos a prop no mock, por enquanto ignoramos ou implementamos se houver lógica
      // const favoriteFilter = favoriteFilters.length > 0;

      filteredList = filteredList.filter((fund) => {
        // Filtro por valor (OR entre as opções de valor)
        let matchesValue = true;
        if (valueFilters.length > 0) {
          matchesValue = valueFilters.some((filter) => {
            const min = fund.valorMinimoAplicacaoInternet;
            switch (filter.id) {
              case 1:
                return min <= 500;
              case 2:
                return min > 500 && min <= 1000;
              case 3:
                return min > 1000;
              default:
                return false;
            }
          });
        }

        // Filtro por risco (OR entre as opções de risco)
        let matchesRisk = true;
        if (riskFilters.length > 0) {
          matchesRisk = riskFilters.some((filter) => {
            // Normalização para comparar strings de risco de forma segura
            const fundRisk = (fund.classificacaoRisco || '')
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '');
            const filterVal = (filter.value || '')
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '');
            return fundRisk === filterVal;
          });
        }

        return matchesValue && matchesRisk;
      });
    }

    setInvestmentFunds(filteredList);
  };

  useEffect(() => {
    if (filters && filters.length > 0) {
      setFilters(filters);
    }
  }, [filters]);

  useEffect(() => {
    executeFiltering();
  }, [filtersContext, searchText]);

  const changeCurrentExpanded = (key: number) => {
    //controla qual fundo esta expandido
    if (key === currentExpanded) {
      //caso clique em um fundo já expandido fecha o mesmo
      setCurrentExpanded(-1);
      return;
    }
    setCurrentExpanded(key);
  };

  return (
    <View>
      <View style={styles.container}>
        <SearchBar
          placeholder='Buscar fundo'
          value={searchText}
          onChangeText={(e) => setSearchText(e)}
          onIconPress={() => {}}
          filter
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className='gap-5 pb-5'>
            {investmentFunds.map((fund) => {
              return (
                <FundsCard
                  fund={fund}
                  key={fund.codigoFundo}
                  onPress={() => changeCurrentExpanded(fund.codigoFundo)}
                  expanded={currentExpanded === fund.codigoFundo}
                  requireInvestorProfileCheck={true}
                  onProfileCheckRequested={() =>
                    handleProfileCheckRequest(fund)
                  }
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
      <Modalize
        ref={modalizeRef}
        handleStyle={{ backgroundColor: theme.textSecundary }}
        modalStyle={{ backgroundColor: theme.backgroundCards }}
        modalHeight={360}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            padding: 24,
            gap: 20,
            paddingTop: 40,
          }}
        >
          <StyledText
            style={{
              fontSize: 22,
              fontFamily: 'Whitney-Bold',
              color: theme.text,
              textAlign: 'center',
            }}
          >
            Perfil do Investidor necessário
          </StyledText>
          <StyledText
            style={{
              fontSize: 16,
              color: theme.textSecundary,
              textAlign: 'center',
              lineHeight: 22,
            }}
          >
            Para aplicar neste fundo você deve fazer a Análise de Perfil do
            Investidor. Faça o teste clicando no botão abaixo.
          </StyledText>
          <NavigationButton
            onPress={handleNavigateToInvest}
            text='Continuar'
            width={260}
          />
        </View>
      </Modalize>
    </View>
  );
}

const getStyles = (theme: StylesType) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      height: '100%',
      gap: 20,
      paddingTop: 24,
    },
  });
};
