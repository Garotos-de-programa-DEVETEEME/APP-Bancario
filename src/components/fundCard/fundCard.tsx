import { FundoInvestimento } from '@/src/@Types/fundos'
import { useTheme } from '@/src/hooks/useTheme'
import { StylesType } from '@/src/themes/Colors'
import { coinFormat } from '@/src/utils/coinFormat'
import { Pressable, StyleSheet, View } from 'react-native'
import { StyledText } from '../StyledText'
import { Expanded } from './expandedFund'
import { RiskIcon } from './riskIcon'

interface FundsCardProps {
  fund: FundoInvestimento
  onPress: () => void
  expanded: boolean
  expandedType?: "default" | "simular"
  onSimulate?: () => void
}

export const FundsCard = ({ fund, onPress, expanded, expandedType = "default", onSimulate }: FundsCardProps) => {
  const theme = useTheme()
  const styles = getStyle(theme)

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <View style={styles.textContainer}>
          <StyledText style={styles.fundTypeText}>{/*fund.type*/}</StyledText> {/* TODO: integrar quando tivermos api pronta */}
          <View style={styles.riskContainer}>
            <RiskIcon risk={'alto' /*fund.risk*/} />{/*TODO integrar quando a api estiver pronta */}
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
          <StyledText style={styles.rentabilityText}>{/* TODO arrow icons */}
            {`${fund.taxaRentabilidade}%`}
            {/*TODO consultar se este valor esta em porcentagem */}
          </StyledText>
        </View>
        
        <Expanded 
          fund={fund} 
          expanded={expanded} 
          type={expandedType} 
          onSimulate={onSimulate ? onSimulate : () => {}} 
        />

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
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      color: theme.text,
      fontSize: 17,
    },
    text: {
      color: theme.alternativeText,
      fontSize: 13,
    },
    rentabilityText: {
      color: theme.tint,
      fontSize: 17,
    },
    riskContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
  })
}