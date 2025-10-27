import { FundoInvestimento } from '@/@Types/fundos';
import { useTheme } from '@/hooks/useTheme';
import { coinFormat } from '@/utils/coinFormat';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { StyledText } from '../StyledText';
import { Expanded } from './expandedFund';
import { RiskIcon } from './riskIcon';

interface FundsCardProps {
  fund: FundoInvestimento;
  onPress: () => void;
  expanded: boolean;
  expandedType?: 'default' | 'simular';
  requireInvestorProfileCheck?: boolean;
  onProfileCheckRequested?: () => void;
}

export const FundsCard = ({
  fund,
  onPress,
  expanded,
  expandedType = 'default',
  requireInvestorProfileCheck,
  onProfileCheckRequested,
}: FundsCardProps) => {
  //componente de card de fundo de investimento
  const theme = useTheme();

  return (
    <View
      style={[
        styles.cardContainer,
        { backgroundColor: theme.backgroundCards, borderColor: theme.border, borderWidth: 1 },
      ]}
    >
      <Pressable onPress={onPress}>
        <View style={styles.rowBetween}>
          <StyledText style={[styles.textMd, { color: theme.tint }]}>
            {'Fundo'}
          </StyledText>
          <View style={styles.riskContainer}>
            <RiskIcon risk={'alto'} />
            {/* TODO integrar quando a api estiver pronta */}
          </View>
        </View>

        <View>
          <StyledText style={[styles.textXlBold, { color: theme.text }]}>
            {fund.nome}
          </StyledText>
        </View>

        {/* divisor */}
        {expanded ? (
          <View
            style={{ borderTopColor: theme.border, borderTopWidth: 1 }}
          />
        ) : null}

        <View style={styles.rowBetween}>
          <StyledText style={[styles.textBase, { color: theme.alternativeText }]}>
            Aplicação incial:{' '}
          </StyledText>
          <StyledText style={[styles.textBase, { color: theme.alternativeText }]}>
            {coinFormat(fund.valorAplicacaoInicial)}
          </StyledText>
        </View>

        <View style={styles.rowBetween}>
          <StyledText style={[styles.textBase, { color: theme.alternativeText }]}>
            Rentabilidade dos ultimos 12 meses
          </StyledText>
          <View style={styles.rentabilityValueContainer}>
            {fund.taxaRentabilidade > 0 ? (
              <MaterialCommunityIcons name="arrow-up" size={16} color="green" />
            ) : (
              <MaterialCommunityIcons name="arrow-down" size={16} color="red" />
            )}
            <StyledText style={[styles.textLg, { color: theme.tint }]}>
              {`${fund.taxaRentabilidade}%`}
            </StyledText>
          </View>
        </View>

        {/* conteúdo expandido */}
        {expanded ? (
          <View>
            <Expanded
              fund={fund}
              expanded={expanded}
              type={expandedType}
              requireInvestorProfileCheck={requireInvestorProfileCheck}
              onProfileCheckRequested={onProfileCheckRequested}
            />
          </View>
        ) : null}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 380,
    borderRadius: 15,
    boxSizing: 'border-box',
    paddingTop: 4,
    paddingBottom: 2,
    paddingRight: 11,
    paddingLeft: 4,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textMd: {
    fontSize: 16,
  },
  riskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textXlBold: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textBase: {
    fontSize: 16,
  },
  rentabilityValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLg: {
    fontSize: 18,
  },
});