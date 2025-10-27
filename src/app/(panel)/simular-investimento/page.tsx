import { BaseScreen } from '@/components/BaseScreen/BaseScreen';
import { ScreenStates } from '@/components/BaseScreen/ScreenStates';
import { FundsCard } from '@/components/fundo/fundCard';
import { useTheme } from '@/hooks/useTheme';
import { mockConsultarListaFundosAFA } from '@/mock/afa-fundos.mock';
import { ListaFundosAFAResponse } from '@/services/afa-fundos.service';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

type FundoAFAType = ListaFundosAFAResponse[0];


export default function SimularInvestimento() {
  const [screenState, setScreenState] = useState(ScreenStates.loading());
  const theme = useTheme();
  
  const [investmentFunds, setInvestmentFunds] = useState<FundoAFAType[]>([]);

  const [currentExpanded, setCurrentExpanded] = useState(-1);

  const changeCurrentExpanded = (key: number) => {
    if (key === currentExpanded) {
      setCurrentExpanded(-1);
      return;
    }
    setCurrentExpanded(key);
  };

  useEffect(() => {
    async function carregarFundos() {
      try {
        setScreenState(ScreenStates.loading());
        const fundos = await mockConsultarListaFundosAFA(); 
        setInvestmentFunds(fundos);
        setScreenState(ScreenStates.content());
      } catch (error) {
        console.error("Erro ao carregar fundos:", error);
        setScreenState(ScreenStates.error("Não foi possível carregar os fundos."));
      }
    }

    carregarFundos();
  }, []);

  return (
    BaseScreen({
      state: screenState,
      children: (
        <ScrollView style={{backgroundColor: theme.background}}>
          <View
            style={[styles.container, { backgroundColor: theme.background }]}
          >
            <View
              style={[styles.infoBox, { backgroundColor: theme.backgroundCards }]}
            >
              <Text
                style={[styles.infoText, { color: theme.alternativeText }]}
              >
                A simulação considera seu perfil de investidor previamente cadastrado,
                garantindo maior adequação às suas preferências e tolerância a risco.
              </Text>
            </View>

            <View>
              <Text
                style={[styles.title, { color: theme.darkText || theme.text }]}
              >
                Fundos
              </Text>

              <View style={styles.cardList}>
                {investmentFunds.map((fund) => {
                  return (
                    <FundsCard
                      fund={fund} 
                      key={fund.codigo}
                      onPress={() => changeCurrentExpanded(fund.codigo)}
                      expanded={currentExpanded === fund.codigo}
                      expandedType="simular"
                    />
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      )
    })
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 40,
  },
  infoBox: {
    width: 380,
    minHeight: 75,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 45,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  infoText: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'left',
    fontWeight: '500',
  },
  title: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  cardList: {
    gap: 20,
  },
});

