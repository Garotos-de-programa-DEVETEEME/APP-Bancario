import { riskTheme } from '@/constants/risk';
import { useTheme } from '@/hooks/useTheme';
import { StyleSheet, Text, View } from 'react-native';

interface riskIconProps {
  risk: 'muito baixo' | 'baixo' | 'medio' | 'alto'; 
}

export const RiskIcon = ({ risk }: riskIconProps) => {
  const theme = useTheme();
  const ballSize = 10;
  const radius = ballSize / 2;

  return (
    <>
      <Text
        style={[styles.riskText, { color: theme.alternativeText }]}
      >
        {`Risco ${risk === 'medio' ? 'médio' : risk}`}{' '}
      </Text>

      <View style={styles.ballsContainer}>
        <Text
          style={{
            width: ballSize,
            height: ballSize,
            borderRadius: radius,
            backgroundColor:
              risk === 'muito baixo'
                ? riskTheme.veryLow
                : risk === 'baixo'
                ? riskTheme.low
                : risk === 'medio'
                ? riskTheme.medium
                : riskTheme.high,
          }}
        />
        <Text
          style={{
            width: ballSize,
            height: ballSize,
            borderRadius: radius,
            backgroundColor:
              risk === 'baixo'
                ? riskTheme.low
                : risk === 'medio'
                ? riskTheme.medium
                : risk === 'alto'
                ? riskTheme.high
                : undefined,
          }}
        />
        <Text
          style={{
            width: ballSize,
            height: ballSize,
            borderRadius: radius,
            backgroundColor:
              risk === 'medio'
                ? riskTheme.medium
                : risk === 'alto'
                ? riskTheme.high
                : undefined,
          }}
        />
        <Text
          style={{
            width: ballSize,
            height: ballSize,
            borderRadius: radius,
            backgroundColor: risk === 'alto' ? riskTheme.high : undefined,
          }}
        />
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
