import { useTheme } from '@/src/hooks/useTheme'
import { StylesType } from '@/src/themes/Colors'
import { StyleSheet, View } from 'react-native'
import { StyledText } from '../StyledText'

interface riskIconProps {
  risk: 'muito baixo' | 'baixo' | 'medio' | 'alto'
}

export const RiskIcon = ({ risk }: riskIconProps) => {//componente de risco de fundo 
  const theme = useTheme()
  const styles = getStyles(theme, risk)
  return (
    <>
      <StyledText style={styles.fundRiskText}>
        {`Risco ${risk === 'muito baixo' ? 'muito baixo' : risk === 'baixo' ? 'baixo' : risk === 'medio' ? 'médio' : 'alto'}:`}
      </StyledText>
      <View style={styles.container}>
        <StyledText style={styles.firstIcon}></StyledText>
        <StyledText style={styles.secondIcon}></StyledText>
        <StyledText style={styles.thirdIcon}></StyledText>
        <StyledText style={styles.fourthIcon}></StyledText>
      </View>
    </>
  )
}

const getStyles = (theme: StylesType, risk: string) => {
  const ballSize = 10

  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      gap: 1,
    },
    fundRiskText: {
      color: theme.alternativeIcon,
      fontSize: 12,
      fontFamily: theme.fontFamily,
    },
    firstIcon: {
      backgroundColor:
        risk === 'muito baixo'
          ? theme.risk.veryLow
          : risk === 'baixo'
            ? theme.risk.low
            : risk === 'medio'
              ? theme.risk.medium
              : theme.risk.high,
      width: ballSize,
      height: ballSize,
      borderRadius: ballSize / 2,
    },
    secondIcon: {
      backgroundColor:
        risk === 'baixo'
          ? theme.risk.low
          : risk === 'medio'
            ? theme.risk.medium
            : risk === 'alto'
              ? theme.risk.high
              : '',
      width: ballSize,
      height: ballSize,
      borderRadius: ballSize / 2,
    },
    thirdIcon: {
      backgroundColor:
        risk === 'medio'
          ? theme.risk.medium
          : risk === 'alto'
            ? theme.risk.high
            : '',
      width: ballSize,
      height: ballSize,
      borderRadius: ballSize / 2,
    },
    fourthIcon: {
      backgroundColor: risk === 'alto' ? theme.risk.high : '',
      width: ballSize,
      height: ballSize,
      borderRadius: ballSize / 2,
    },
  })
}
