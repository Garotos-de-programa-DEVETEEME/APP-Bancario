import { useTheme } from '@/hooks/useTheme';
import { FundoDetalhe } from '@/services/fundos.service';
import { coinFormat } from '@/utils/coinFormat';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Expanded } from './expandedFund';
import { RiskIcon } from './riskIcon';

interface FundsCardProps {
  fund: FundoDetalhe;
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
          <Text style={[styles.textMd, { color: theme.tint }]}>
            {'Fundo'}
          </Text>
          <View style={styles.riskContainer}>
            <RiskIcon
              risk={fund.classificacaoRisco.toLowerCase() as any}
            />
          </View>
        </View>

        <View>
          <Text style={[styles.textXlBold, { color: theme.text }]}>
            {fund.nome}
          </Text>
        </View>

        {expanded ? (
          <View
            style={[styles.divider, { borderTopColor: theme.border }]}
          />
        ) : null}

        <View style={styles.rowBetween}>
          <Text style={[styles.textBase, { color: theme.alternativeText }]}>
            Aplicação inicial:{' '}
          </Text>
          <Text style={[styles.textBase, { color: theme.alternativeText }]}>
            {coinFormat(fund.valorAplicacaoInicial)}
          </Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={[styles.textBase, { color: theme.alternativeText }]}>
            Rentabilidade (12 meses):
          </Text>
          <View style={styles.rentabilityValueContainer}>
            {fund.taxaRentabilidade > 0 ? (
              <MaterialCommunityIcons name="arrow-up" size={16} color="green" />
            ) : (
              <MaterialCommunityIcons name="arrow-down" size={16} color="red" />
            )}
            <Text style={[styles.textLg, { color: theme.tint }]}>
              {`${fund.taxaRentabilidade.toFixed(2)}%`}
            </Text>
          </View>
        </View>

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
  divider: {
    borderTopWidth: 1,
    marginVertical: 8,
  },
});