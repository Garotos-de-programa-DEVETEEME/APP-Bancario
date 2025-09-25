import { FundoInvestimento } from '@/src/@Types/fundos';
import { useTheme } from '@/src/hooks/useTheme';
import { coinFormat } from '@/src/utils/coinFormat';
import { Pressable, View } from 'react-native';
import { StyledText } from '../StyledText';
import { Expanded } from './expandedFund';
import { RiskIcon } from './riskIcon';

// ✅ imports de animação
import Animated, { FadeInDown, FadeOutUp, LinearTransition } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface FundsCardProps {
  fund: FundoInvestimento;
  onPress: () => void;
  expanded: boolean;
  expandedType?: 'default' | 'simular';
}

export const FundsCard = ({
  fund,
  onPress,
  expanded,
  expandedType = 'default',
}: FundsCardProps) => {
  //componente de card de fundo de investimento
  const theme = useTheme();

  return (
    <Animated.View
      // ⬇️ substitui Layout.springify() por LinearTransition.springify()
      layout={LinearTransition.springify().damping(16).stiffness(140)}
      className="w-[380px] rounded-[15px] border box-border pt-[4px] pb-[2px] pr-[11px] pl-[4px] self-center shadow-md elevation-4"
      style={{ backgroundColor: theme.backgroundCards, borderColor: theme.border, borderWidth: 1 }}
    >
      <Pressable onPress={onPress}>
        <View className="flex flex-row justify-between">
          <StyledText className="text-md" style={{ color: theme.tint }}>
            {'Fundo'}
          </StyledText>
          <View className="flex flex-row items-center gap-[10px]">
            <RiskIcon risk={'alto'} />
            {/* TODO integrar quando a api estiver pronta */}
          </View>
        </View>

        <View>
          <StyledText className="text-xl font-bold" style={{ color: theme.text }}>
            {fund.nome}
          </StyledText>
        </View>

        {/* divisor animado */}
        {expanded ? (
          <Animated.View
            entering={FadeInDown.duration(140)}
            exiting={FadeOutUp.duration(120)}
            layout={LinearTransition.springify().damping(18)}
            style={{ borderTopColor: theme.border, borderTopWidth: 1 }}
          />
        ) : null}

        <View className="flex flex-row justify-between">
          <StyledText className="text-base" style={{ color: theme.alternativeText }}>
            Aplicação incial:{' '}
          </StyledText>
          <StyledText className="text-base" style={{ color: theme.alternativeText }}>
            {coinFormat(fund.valorAplicacaoInicial)}
          </StyledText>
        </View>

        <View className="flex flex-row justify-between">
          <StyledText className="text-base" style={{ color: theme.alternativeText }}>
            Rentabilidade dos ultimos 12 meses
          </StyledText>
          <View className="flex flex-row items-center">
            {fund.taxaRentabilidade > 0 ? 
              <MaterialCommunityIcons name="arrow-up" size={16} color="green" />:
              <MaterialCommunityIcons name="arrow-down" size={16} color="red" />

            }
            <StyledText className="text-lg" style={{ color: theme.tint }}>
              {`${fund.taxaRentabilidade}%`}
            </StyledText>
          </View>
        </View>

        {/* conteúdo expandido, agora com FadeInDown/FadeOutUp */}
        {expanded ? (
          <Animated.View
            entering={FadeInDown.duration(180)}
            exiting={FadeOutUp.duration(140)}
            layout={LinearTransition.springify().damping(16).stiffness(140)}
          >
            <Expanded
              fund={fund}
              expanded={expanded}
              type={expandedType}
            />
          </Animated.View>
        ) : null}
      </Pressable>
    </Animated.View>
  );
};