import { FundoInvestimento } from '@/src/@Types/fundos';
import { useTheme } from '@/src/hooks/useTheme';
import { converterNumeroParaHora } from '@/src/utils/hourFormat';
import { router } from 'expo-router';
import { View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp, LinearTransition } from 'react-native-reanimated';
import { NavigationButton } from '../Buttons/navigationButton';
import { StyledText } from '../StyledText';

interface expandedProps {
  fund: FundoInvestimento;
  expanded: boolean;
  type?: 'default' | 'simular';
  requireInvestorProfileCheck?: boolean;
  onProfileCheckRequested?: () => void;
}

export const Expanded = ({
  fund,
  expanded,
  type,
  requireInvestorProfileCheck = false,
  onProfileCheckRequested,
}: expandedProps) => {
  //componente de fundo de investimento expandido
  const theme = useTheme();

  if (!expanded) return null;

  const handleInvestPress = () => {
    if (requireInvestorProfileCheck && onProfileCheckRequested) {
      onProfileCheckRequested();
    } else {
      router.push({
        pathname: '/fundosInvestimentos/investir',
        params: { fundData: JSON.stringify(fund) },
      });
    }
  };

  return (
    <Animated.View
      entering={FadeInDown.duration(180)}
      exiting={FadeOutUp.duration(140)}
      layout={LinearTransition.springify().damping(16).stiffness(140)}
      className="flex flex-col"
    >
      <View className="flex flex-row justify-between">
        <StyledText className="text-[13px]" style={{ color: theme.alternativeText }}>
          Taxa global:{' '}
        </StyledText>
        <StyledText className="text-[13px]" style={{ color: theme.alternativeText }}>
          {`${fund.taxaAdministracao}% a.a.`}
        </StyledText>
      </View>

      <View className="flex flex-row justify-between">
        <StyledText className="text-[13px]" style={{ color: theme.alternativeText }}>
          Hora limite de aplicação:{' '}
        </StyledText>
        <StyledText className="text-[13px]" style={{ color: theme.alternativeText }}>
          {converterNumeroParaHora(fund.horaLimite)}
        </StyledText>
      </View>

      <View className="flex flex-row justify-between">
        <StyledText className="text-[13px]" style={{ color: theme.alternativeText }}>
          Movimentação (aplic/resg):{' '}
        </StyledText>
        <StyledText className="text-[13px]" style={{ color: theme.alternativeText }}>
          {'R$ 1,00'}
        </StyledText>
      </View>

      <View className="flex flex-row justify-between">
        <StyledText className="text-[13px]" style={{ color: theme.alternativeText }}>
          Cotização de resgate:{' '}
        </StyledText>
        <StyledText className="text-[13px]" style={{ color: theme.alternativeText }}>
          D+30 (Dias Corridos)
        </StyledText>
      </View>

      <View className="flex flex-row justify-between">
        <StyledText className="text-[13px]" style={{ color: theme.alternativeText }}>
          Liquidação de resgate:{' '}
        </StyledText>
        <StyledText className="text-[13px]" style={{ color: theme.alternativeText }}>
          {`D+${fund.prazoConversaoResgate} (Dias Úteis)`}
        </StyledText>
      </View>

      {type === 'simular' ? (
        <View className="items-center justify-center mt-2.5">
          <NavigationButton
            onPress={() => router.push({
              pathname:'simularInvestimento/detalhesFundo/',
              params: { fundData: JSON.stringify(fund) },
            })}
            text='Simular'
          />
        </View>
      ) : (
        <View className="flex flex-row justify-between">
          <NavigationButton
            onPress={() => router.push({
              pathname: '/fundosInvestimentos/saibaMais',
              params: { fundData: JSON.stringify(fund) },
            })}
            text='Saiba Mais'
            transparentStyle
          />
          <NavigationButton
            onPress={handleInvestPress}
            text='Investir'
          />
        </View>
      )}
    </Animated.View>
  );
};