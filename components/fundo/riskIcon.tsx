import { riskTheme } from '@/constants/risk';
import { useTheme } from '@/hooks/useTheme';
import { StyleSheet, Text, View } from 'react-native';

type RiskLevel = 'muito baixo' | 'baixo' | 'medio' | 'alto';

interface RiskIconProps {
  risk: RiskLevel;
}

const riskConfig: Record<
  RiskLevel,
  { color: string; filledCount: number }
> = {
  'muito baixo': { color: riskTheme.veryLow, filledCount: 1 },
  baixo: { color: riskTheme.low, filledCount: 2 },
  medio: { color: riskTheme.medium, filledCount: 3 },
  alto: { color: riskTheme.high, filledCount: 4 },
};

export const RiskIcon = ({ risk }: RiskIconProps) => {
  const theme = useTheme();
  const ballSize = 10;
  const radius = ballSize / 2;
  const totalBalls = 4;

  const { color, filledCount } = riskConfig[risk];

  return (
    <>
      <Text style={[styles.riskText, { color: theme.alternativeText }]}>
        {`Risco ${risk === 'medio' ? 'médio' : risk}`}{' '}
      </Text>

      <View style={styles.ballsContainer}>
        {Array.from({ length: totalBalls }).map((_, index) => (
          <View
            key={index}
            style={{
              width: ballSize,
              height: ballSize,
              borderRadius: radius,
              backgroundColor: index < filledCount ? color : undefined,
            }}
          />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  riskText: {
    fontSize: 16,
    fontWeight: '500',
  },
  ballsContainer: {
    flexDirection: 'row',
    gap: 1,
  },
});
