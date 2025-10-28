import { useTheme } from '@/hooks/useTheme';
import { FundoDetalhe } from '@/services/fundos.service';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationButton } from '../buttons/navigationButton';

const formatHour = (hourNumber: number): string => {
  if (hourNumber == null || isNaN(hourNumber)) {
    return '--:--'; 
  }
  const hourString = String(hourNumber).padStart(4, '0'); 
  const hours = hourString.substring(0, 2);
  const minutes = hourString.substring(2, 4);
  return `${hours}:${minutes}`;
};

const formatCurrency = (value: number) => {
    if (value === undefined || value === null) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

interface ExpandedProps {
  fund: FundoDetalhe; 
  expanded: boolean;
  type?: 'default' | 'simular';
  requireInvestorProfileCheck?: boolean;
  onProfileCheckRequested?: () => void;
}

export const Expanded = ({
  fund,
  expanded,
  type,
  requireInvestorProfileCheck = false,
  onProfileCheckRequested,
}: ExpandedProps) => {
  const theme = useTheme();

  if (!expanded) return null;

  const handleInvestPress = () => {
    if (requireInvestorProfileCheck && onProfileCheckRequested) {
      onProfileCheckRequested();
    } else {
      router.push({
        pathname: '/(panel)/home/page', //TODO: Colocar caminho novo investir
        params: { fundData: JSON.stringify(fund) }, 
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowBetween}>
        <Text style={[styles.textDetail, { color: theme.alternativeText }]}>
          Taxa global:{' '}
        </Text>
        <Text style={[styles.textDetail, { color: theme.alternativeText }]}>
          {`${fund.taxaAdministracao}% a.a.`}
        </Text>
      </View>

      <View style={styles.rowBetween}>
        <Text style={[styles.textDetail, { color: theme.alternativeText }]}>
          Hora limite de aplicação:{' '}
        </Text>
        <Text style={[styles.textDetail, { color: theme.alternativeText }]}>
          {formatHour(fund.horaLimite)} 
        </Text>
      </View>

      <View style={styles.rowBetween}>
        <Text style={[styles.textDetail, { color: theme.alternativeText }]}>
          Movimentação (aplic/resg):{' '}
        </Text>
        <Text style={[styles.textDetail, { color: theme.alternativeText }]}>
           {`${formatCurrency(fund.valorMinimoAplicacaoInternet)} / ${formatCurrency(fund.valorMinimoResgateInternet)}`}
        </Text>
      </View>

      <View style={styles.rowBetween}>
        <Text style={[styles.textDetail, { color: theme.alternativeText }]}>
          Cotização de resgate:{' '}
        </Text>
        <Text style={[styles.textDetail, { color: theme.alternativeText }]}>
          {fund.cotizacaoResgate}
        </Text>
      </View>

      <View style={styles.rowBetween}>
        <Text style={[styles.textDetail, { color: theme.alternativeText }]}>
          Liquidação de resgate:{' '}
        </Text>
        <Text style={[styles.textDetail, { color: theme.alternativeText }]}>
          {fund.liquidacaoResgate}
        </Text>
      </View>

      {type === 'simular' ? (
        <View style={styles.buttonContainerCenter}>
          <NavigationButton
            onPress={() => router.push({
              pathname: '/(panel)/simular-investimento/simulacao',
              params: { fundData: JSON.stringify(fund) }, 
            })}
            text='Simular'
          />
        </View>
      ) : (
        <View style={styles.buttonRowBetween}> 
          <NavigationButton
            onPress={() => router.push({
              pathname: '/(panel)/home/page', //TODO: Colocar caminho novo saiba mais
              params: { fundData: JSON.stringify(fund) }, 
            })}
            text='Saiba Mais'
            transparentStyle
          />
          <NavigationButton
            onPress={handleInvestPress}
            text='Investir'
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textDetail: {
    fontSize: 13,
  },
  buttonContainerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 4,
  },
  buttonRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 4,
  }
});