import { riskTheme } from '@/constants/risk';
import { useTheme } from '@/hooks/useTheme';
import { StyleSheet, View } from 'react-native';
import { StyledText } from '../StyledText';

interface riskIconProps {
  risk: 'muito baixo' | 'baixo' | 'medio' | 'alto'; // TODO alterar conforme resposta da API
}

export const RiskIcon = ({ risk }: riskIconProps) => {
  // componente de risco de fundo
  const theme = useTheme();
  const ballSize = 10;

  // helper para arredondamento baseado no ballSize
  const radius = ballSize / 2;

  return (
    <>
      <StyledText
        style={[styles.riskText, { color: theme.alternativeText }]}
      >
        {`Risco ${risk === 'medio' ? 'médio' : risk}`}{' '}
        {/* expressão booleana para adicionar acento no médio preferencialmente os risk deve vir da api já com o nome correto */}
        {/* TODO alterar conforme resposta da API */}
      </StyledText>

      <View style={styles.ballsContainer}>
        {/* firstIcon */}
        <StyledText
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

        {/* secondIcon */}
        <StyledText
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

        {/* thirdIcon */}
        <StyledText
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

        {/* fourthIcon */}
        <StyledText
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