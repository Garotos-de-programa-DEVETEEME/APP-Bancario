import { useTheme } from '@/src/hooks/useTheme';
import { riskTheme } from '@/src/themes/risk';
import { View } from 'react-native';
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
        className='text-base font-medium'
        style={{ color: theme.alternativeText }}
      >
        {`Risco ${risk === 'medio' ? 'médio' : risk}`}{' '}
        {/* expressão booleana para adicionar acento no médio preferencialmente os risk deve vir da api já com o nome correto */}
        {/* TODO alterar conforme resposta da API */}
      </StyledText>

      <View className='flex flex-row gap-[1px]'>
        {/* firstIcon */}
        <StyledText
          className='w-[10px] h-[10px]'
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
          className='w-[10px] h-[10px]'
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
          className='w-[10px] h-[10px]'
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
          className='w-[10px] h-[10px]'
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
