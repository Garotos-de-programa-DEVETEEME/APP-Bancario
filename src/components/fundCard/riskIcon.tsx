import { useTheme } from '@/src/hooks/useTheme';
import { StyleSheet, View } from 'react-native';
import { StyledText } from '../StyledText';
import { StylesType } from '@/src/@Types/stylesType';
import { riskTheme } from '@/src/themes/risk';

interface riskIconProps {
  risk: 'muito baixo' | 'baixo' | 'medio' | 'alto'; //TODO alterar conforme resposata da API
}

export const RiskIcon = ({ risk }: riskIconProps) => {
  //componente de risco de fundo
  const theme = useTheme();
  const styles = getStyles(theme, risk);
  return (
    <>
      <StyledText style={styles.fundRiskText}>
        {`Risco ${risk === 'medio' ? 'médio' : risk}:`}{' '}
        {/*expressão booleana para adicionar acento no médio preferencialmente os risk deve vir da api já com o nome correto */}
        {/*TODO alterar conforme resposata da API */}
      </StyledText>
      <View style={styles.container}>
        <StyledText style={[styles.firstIcon, styles.riskIcon]}></StyledText>
        <StyledText style={[styles.secondIcon, styles.riskIcon]}></StyledText>
        <StyledText style={[styles.thirdIcon, styles.riskIcon]}></StyledText>
        <StyledText style={[styles.fourthIcon, styles.riskIcon]}></StyledText>
      </View>
    </>
  );
};

const getStyles = (theme: StylesType, risk: string) => {
  const ballSize = 10;

  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      gap: 1,
    },
    fundRiskText: {
      color: theme.alternativeIcon,
      fontSize: 12,
    },
    riskIcon: {
      width: ballSize,
      height: ballSize,
      borderRadius: ballSize / 2,
    },
    //defição das cores da bolinha de risco conforme a sua posição
    firstIcon: {
      backgroundColor:
        risk === 'muito baixo'
          ? riskTheme.veryLow
          : risk === 'baixo'
            ? riskTheme.low
            : risk === 'medio'
              ? riskTheme.medium
              : riskTheme.high,
      width: ballSize,
      height: ballSize,
      borderRadius: ballSize / 2,
    },
    secondIcon: {
      backgroundColor:
        risk === 'baixo'
          ? riskTheme.low
          : risk === 'medio'
            ? riskTheme.medium
            : risk === 'alto'
              ? riskTheme.high
              : '',
    },
    thirdIcon: {
      backgroundColor:
        risk === 'medio'
          ? riskTheme.medium
          : risk === 'alto'
            ? riskTheme.high
            : '',
    },
    fourthIcon: {
      backgroundColor: risk === 'alto' ? riskTheme.high : '',
      width: ballSize,
      height: ballSize,
      borderRadius: ballSize / 2,
    },
  });
};
