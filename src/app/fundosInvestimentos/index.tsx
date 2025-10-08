import { FundoInvestimento } from '@/src/@Types/fundos';
import { StylesType } from '@/src/@Types/stylesType';
import { NavigationButton } from '@/src/components/Buttons/navigationButton';
import { FundsCard } from '@/src/components/fundCard/fundCard';
import { SearchBar } from '@/src/components/SearchBar/searchBar';
import { StyledText } from '@/src/components/StyledText';
import { MOCK_FUNDOS } from '@/src/data/fundos';
import { useTheme } from '@/src/hooks/useTheme';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

interface FundoInvestimentoProps {
  filters?: string | string[];
}

export default function FundoInvestimentoPage({ filters }: FundoInvestimentoProps) {
  const investmentFunds = MOCK_FUNDOS; //TODO : Fetch real data from API or context
  const theme = useTheme();
  const styles = getStyles(theme);

  const [currentExpanded, setCurrentExpanded] = useState(-1); //variavel que controla o fundo expandido com base no seu ID
  const [searchBarValue, setSearchBarValue] = useState<string>('');

  //TODO implementar funcionalidade de pesquisa de texto

  // lógica para o bottom sheet
  const modalizeRef = useRef<Modalize>(null);
  const [selectedFund, setSelectedFund] = useState<FundoInvestimento | null>(null);

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

  const searchByText = (searchText: string) => {};

  useEffect(() => {
    if (typeof filters === 'string') {
      setSearchBarValue(filters);
      searchByText(filters);
    }
  }, [filters]);

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
    <>
      <View style={styles.container}>
        <SearchBar
          placeholder='Buscar fundo'
          value={searchBarValue}
          onChangeText={(e) => setSearchBarValue(e)}
          onIconPress={() => searchByText(searchBarValue)}
          filter
        />

        {investmentFunds.map((fund) => {
          return (
            <FundsCard
              fund={fund}
              key={fund.codigo}
              onPress={() => changeCurrentExpanded(fund.codigo)}
              expanded={currentExpanded === fund.codigo}
              requireInvestorProfileCheck={true}
              onProfileCheckRequested={() => handleProfileCheckRequest(fund)}
            />
          );
        })}
      </View>
      
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        handleStyle={{ backgroundColor: theme.textSecundary }}
        modalStyle={{ backgroundColor: theme.backgroundCards }}
      >
        <View style={{ flex: 1, alignItems: 'center', padding: 24, gap: 20, paddingTop: 40 }}>
            <StyledText style={{ fontSize: 22, fontFamily: 'Whitney-Bold', color: theme.text, textAlign: 'center' }}>
                Perfil do Investidor necessário
            </StyledText>
            <StyledText style={{ fontSize: 16, color: theme.textSecundary, textAlign: 'center', lineHeight: 22 }}>
                Para aplicar neste fundo você deve fazer a Análise de Perfil do Investidor. Faça o teste clicando no botão abaixo.
            </StyledText>
            <NavigationButton
                onPress={handleNavigateToInvest}
                text="Continuar"
                width={261}
            />
        </View>
      </Modalize>
    </>
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