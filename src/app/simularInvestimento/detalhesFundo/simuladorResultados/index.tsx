import { FundoInvestimento } from '@/src/@Types/fundos';
import { StylesType } from '@/src/@Types/stylesType';
import { NavigationButton } from '@/src/components/Buttons/navigationButton';
import { useTheme } from '@/src/hooks/useTheme';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// Interface para os dados que esta tela recebe
interface SimulationData {
  fund: FundoInvestimento;
  valorInicial: number;
  valorMensal: number;
  periodo: string;
}

const formatCurrency = (valueInCents: number) => {
  const valueInReais = valueInCents / 100;
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valueInReais);
};

export default function SimuladorResultados() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { data } = useLocalSearchParams();

  if (!data || typeof data !== 'string') {
    return <View style={styles.container}><Text>Erro: Dados da simulação não encontrados.</Text></View>;
  }

  const simulationData: SimulationData = JSON.parse(data);
  const { fund, valorInicial } = simulationData;

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>{fund.nome}</Text>
        <View style={styles.separator} />
        <View style={styles.detailRow}>
          <Text style={styles.label}>Aplicação Inicial:</Text>
          <Text style={styles.value}>
            R$ {fund.valorAplicacaoInicial.toFixed(2)}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Rentabilidade dos últimos 12 meses:</Text>
          <Text style={styles.rentabilidade}>{fund.taxaRentabilidade}%</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Taxa Global:</Text>
          <Text style={styles.value}>{fund.taxaAdministracao}% a.a.</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Hora limite da aplicação:</Text>
          <Text style={styles.value}>
            {fund.horaLimite}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Movimentação (aplic/resg):</Text>
          <Text style={styles.value}>
            R$ {fund.valorMinimoAplicacaoInternet / fund.valorMinimoResgateInternet}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Cotatização de resgate:</Text>
          <Text style={styles.value}>
            D+30 (Dias Corridos)
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Cotatização de resgate:</Text>
          <Text style={styles.value}>
            D+{fund.prazoConversaoResgate} (Dias Úteis)
          </Text>
        </View>

        <View style={styles.resultsContainer}>
          <View style={styles.valueDisplay}>
            <Text style={styles.mainValues}>
              Aplicação inicial
            </Text>
            <Text style={styles.mainValues}>
              {formatCurrency(valorInicial)}
            </Text>
          </View>

          <View style={styles.valueDisplay}>
            <Text style={styles.mainValues}>
              Resgate
            </Text>
            {/* //TODO Adicionar calculo do resultado */}
            <Text style={styles.mainValues}> 
              PLACEHOLDER
            </Text>
          </View>
        </View>

        <View style={styles.valueDisplay}>
          <Text style={styles.textPitch}>Deseja utilizar esses valores para um investimento real?</Text>
        </View>

        <View style={styles.buttonBox}>
          <NavigationButton
            onPress={() => console.log("Pressionado")}
            text='Aplicar Investimento'
            width={261}
            height={37}
          />
        </View>

      </View>
    </ScrollView>
  );
}

const getStyles = (theme: StylesType) => {
  return StyleSheet.create({
    scrollView: {
      backgroundColor: theme.background
    },
    container: {
      flex: 1,
      paddingLeft: 25,
      paddingRight: 25,
      paddingBottom: 25,
      paddingTop: 10
    },
    title: {
      fontSize: 28,
      color: theme.text,
      fontFamily: "Roboto",
      marginBottom: 15,
      fontWeight: 'bold'
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 2,
    },
    separator: {
      height: 1,
      backgroundColor: theme.border,
      marginBottom: 10,
      marginTop: 10
    },
    label: {
      fontSize: 15, color: theme.text
    },
    value: {
      fontSize: 13, fontWeight: '600', color: theme.text
    },
    rentabilidade: {
      fontSize: 15, color: '#4C9AFE'
    },
    resultsContainer: {
      marginTop: 25,
      gap: 16,
      marginBottom: 25,
    },
    valueDisplay: {
      backgroundColor: theme.backgroundCards,
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: 46
    },
    mainValues: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text
    },
    textPitch: {
      fontSize: 12,
      fontStyle: 'italic',
      color: theme.textSecundary
    },
    buttonBox: {
            alignItems: "center",
            marginTop: 10
        },
  });
};