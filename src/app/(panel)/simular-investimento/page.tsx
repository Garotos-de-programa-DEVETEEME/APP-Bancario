import { BaseScreen } from '@/components/BaseScreen/BaseScreen';
import { ScreenStates } from '@/components/BaseScreen/ScreenStates';
import { FundsCard } from '@/components/fundo/fundCard';
import { useTheme } from '@/hooks/useTheme';
import { mockConsultarSaldo } from '@/mock/fundos.mock';
import { FundoDetalhe } from '@/services/fundos.service';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SimularInvestimento() {
  const [screenState, setScreenState] = useState(ScreenStates.loading());
  const theme = useTheme();
  
  const [investmentFunds, setInvestmentFunds] = useState<FundoDetalhe[]>([]);
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
        const saldoData = await mockConsultarSaldo(); 
        setInvestmentFunds(saldoData.listaFundos);
        setScreenState(ScreenStates.content());
      } catch (error) {
        console.error("Erro ao carregar fundos:", error);
        setScreenState(ScreenStates.error("Não foi possível carregar os fundos."));
      }
    }

    carregarFundos();
  }, []);

  return (
    <BaseScreen state={screenState}>
      <ScrollView 
        style={{backgroundColor: theme.background, flex: 1}}
        contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}
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

        <View style={styles.listContainer}>
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
                  key={fund.codigoFundo}
                  onPress={() => changeCurrentExpanded(fund.codigoFundo)}
                  expanded={currentExpanded === fund.codigoFundo}
                  expandedType="simular"
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 40, 
  },
  infoBox: {
    width: '90%', 
    maxWidth: 380,
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
    width: '100%', 
  },
  listContainer: {
    width: '90%', 
    maxWidth: 380, 
  },
  title: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start', 
  },
  cardList: {
    gap: 20,
    width: '100%', 
  },
});