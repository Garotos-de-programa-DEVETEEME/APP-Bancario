import { useTheme } from '@/src/hooks/useTheme'
import { StylesType } from '@/src/themes/Colors'
import { riskTheme } from '@/src/themes/risk'
import { StyleSheet, View } from 'react-native'
import { StyledText } from '../StyledText'

interface riskIconProps {
  risk: 'muito baixo' | 'baixo' | 'medio' | 'alto'
}

export const RiskIcon = ({ risk }: riskIconProps) => {
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
    },
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
      width: ballSize,
      height: ballSize,
      borderRadius: ballSize / 2,
    },
    thirdIcon: {
      backgroundColor:
        risk === 'medio'
          ? riskTheme.medium
          : risk === 'alto'
            ? riskTheme.high
            : '',
      width: ballSize,
      height: ballSize,
      borderRadius: ballSize / 2,
    },
    fourthIcon: {
      backgroundColor: risk === 'alto' ? riskTheme.high : '',
      width: ballSize,
      height: ballSize,
      borderRadius: ballSize / 2,
    },
  })
}
