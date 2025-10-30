import { useTheme } from '@/hooks/useTheme';
import { FundoDetalhe } from '@/services/fundos.service';
import { coinFormat } from '@/utils/coinFormat';
import { convertNumberToTime } from '@/utils/hourFormat';
import { navigateToInvestir, navigateToSaibaMais, navigateToSimulacao } from '@/utils/navigation.utils';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationButton } from '../buttons/navigationButton';

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
      navigateToInvestir(fund); 
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
          {convertNumberToTime(fund.horaLimite)} 
        </Text>
      </View>

      <View style={styles.rowBetween}>
        <Text style={[styles.textDetail, { color: theme.alternativeText }]}>
          Movimentação (aplic/resg):{' '}
        </Text>
        <Text style={[styles.textDetail, { color: theme.alternativeText }]}>
           {`${coinFormat(fund.valorMinimoAplicacaoInternet)} / ${coinFormat(fund.valorMinimoResgateInternet)}`}
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
            onPress={() => navigateToSimulacao(fund)}
            text='Simular'
          />
        </View>
      ) : (
        <View style={styles.buttonRowBetween}> 
          <NavigationButton
            onPress={() => navigateToSaibaMais(fund)}
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