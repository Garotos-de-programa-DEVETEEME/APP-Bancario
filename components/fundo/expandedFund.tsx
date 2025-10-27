import { FundoInvestimento } from '@/@Types/fundos';
import { useTheme } from '@/hooks/useTheme';
import { converterNumeroParaHora } from '@/utils/hourFormat';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { NavigationButton } from '../Buttons/navigationButton';
import { StyledText } from '../StyledText';

interface expandedProps {
  fund: FundoInvestimento;
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
}: expandedProps) => {
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
        <StyledText style={[styles.textDetail, { color: theme.alternativeText }]}>
          Taxa global:{' '}
        </StyledText>
        <StyledText style={[styles.textDetail, { color: theme.alternativeText }]}>
          {`${fund.taxaAdministracao}% a.a.`}
        </StyledText>
      </View>

      <View style={styles.rowBetween}>
        <StyledText style={[styles.textDetail, { color: theme.alternativeText }]}>
          Hora limite de aplicação:{' '}
        </StyledText>
        <StyledText style={[styles.textDetail, { color: theme.alternativeText }]}>
          {converterNumeroParaHora(fund.horaLimite)}
        </StyledText>
      </View>

      <View style={styles.rowBetween}>
        <StyledText style={[styles.textDetail, { color: theme.alternativeText }]}>
          Movimentação (aplic/resg):{' '}
        </StyledText>
        <StyledText style={[styles.textDetail, { color: theme.alternativeText }]}>
          {'R$ 1,00'}
        </StyledText>
      </View>

      <View style={styles.rowBetween}>
        <StyledText style={[styles.textDetail, { color: theme.alternativeText }]}>
          Cotização de resgate:{' '}
        </StyledText>
        <StyledText style={[styles.textDetail, { color: theme.alternativeText }]}>
          D+30 (Dias Corridos)
        </StyledText>
      </View>

      <View style={styles.rowBetween}>
        <StyledText style={[styles.textDetail, { color: theme.alternativeText }]}>
          Liquidação de resgate:{' '}
        </StyledText>
        <StyledText style={[styles.textDetail, { color: theme.alternativeText }]}>
          {`D+${fund.prazoConversaoResgate} (Dias Úteis)`}
        </StyledText>
      </View>

      {type === 'simular' ? (
        <View style={styles.buttonContainerCenter}>
          <NavigationButton
            onPress={() => router.push({
              pathname: '/(panel)/simular-investimento/detalhes',
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
