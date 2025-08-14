import { fundsType } from '@/src/@Types/fundos'
import { useTheme } from '@/src/hooks/useTheme'
import { StylesType } from '@/src/themes/Colors'
import { coinFormat } from '@/src/utils/coinFormat'
import { Pressable, StyleSheet, View } from 'react-native'
import { Expanded } from './expandedFund'
import { RiskIcon } from './riskIcon'
import { StyledText } from '../StyledText'

interface FundsCardProps {
  fund: fundsType
  onPress: () => void
  expanded: boolean
}

export const FundsCard = ({ fund, onPress, expanded }: FundsCardProps) => {
  const theme = useTheme()
  const styles = getStyle(theme)

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <View style={styles.textContainer}>
          <StyledText style={styles.fundTypeText}>{/*fund.type*/}</StyledText>
          <View style={styles.riskContainer}>
            <RiskIcon risk={'alto' /*fund.risk*/} />
          </View>
        </View>
        <View>
          <StyledText style={styles.title}>{fund.nome}</StyledText>
        </View>
        <View
          style={{
            display: expanded ? 'flex' : 'none',
            borderTopColor: theme.border,
            borderTopWidth: 1,
          }}
        ></View>
        <View style={styles.textContainer}>
          <StyledText style={styles.text}>Aplicação incial: </StyledText>
          <StyledText style={styles.text}>
            {coinFormat(fund.valorAplicacaoInicial)}
          </StyledText>
        </View>
        <View style={styles.textContainer}>
          <StyledText style={styles.text}>
            Rentabilidade dos ultimos 12 meses
          </StyledText>
          <StyledText style={styles.rentabilityText}>
            {`${fund.taxaRentabilidade}%`}
            {/* consultar se este valor esta em porcentagem */}
          </StyledText>
        </View>
        <Expanded fund={fund} expanded={expanded} />
      </Pressable>
    </View>
  )
}
const getStyle = (theme: StylesType) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundCards,
      width: 380,
      borderRadius: 15,
      borderColor: theme.border,
      borderWidth: 1,
      boxSizing: 'border-box',
      paddingTop: 4,
      paddingBottom: 2,
      paddingRight: 11,
      paddingLeft: 4,
      alignSelf: 'center',
    },
    fundTypeText: {
      color: theme.tint,
      fontSize: 12,
      fontFamily: theme.fontFamily,
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      color: theme.text,
      fontSize: 17,
      fontFamily: theme.fontFamily,
    },
    text: {
      color: theme.alternativeText,
      fontSize: 13,
      fontFamily: theme.fontFamily,
    },
    rentabilityText: {
      color: theme.tint,
      fontSize: 17,
      fontFamily: theme.fontFamily,
    },
    riskContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
  })
}
