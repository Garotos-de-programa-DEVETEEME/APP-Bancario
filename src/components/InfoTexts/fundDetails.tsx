import { FundoInvestimento } from '@/src/@Types/fundos';
import { StylesType } from '@/src/@Types/stylesType';
import { useTheme } from '@/src/hooks/useTheme';
import { StyleSheet, Text, View } from 'react-native';

interface FundDetailsProps {
  fund: FundoInvestimento;
}

export function FundDetails({ fund }: FundDetailsProps) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
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
        <Text style={styles.value}>{fund.horaLimite}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Movimentação (aplic/resg):</Text>
        <Text style={styles.value}>
          R${' '}
          {fund.valorMinimoAplicacaoInternet / fund.valorMinimoResgateInternet}
        </Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Cotatização de resgate:</Text>
        <Text style={styles.value}>D+30 (Dias Corridos)</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Liquidação de resgate:</Text>
        <Text style={styles.value}>
          D+{fund.prazoConversaoResgate} (Dias Úteis)
        </Text>
      </View>
    </View>
  );
}

const getStyles = (theme: StylesType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontSize: 28,
      color: theme.text,
      fontFamily: 'Roboto',
      marginBottom: 15,
      fontWeight: 'bold',
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
      marginTop: 10,
    },
    label: {
      fontSize: 15,
      color: theme.text,
    },
    value: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.text,
    },
    rentabilidade: {
      fontSize: 15,
      color: '#4C9AFE',
    },
  });
};
