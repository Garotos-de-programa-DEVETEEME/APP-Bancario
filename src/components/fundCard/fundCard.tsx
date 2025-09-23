import { FundoInvestimento } from '@/src/@Types/fundos';
import { useTheme } from '@/src/hooks/useTheme';
import { coinFormat } from '@/src/utils/coinFormat';
import { Pressable, View } from 'react-native';
import { StyledText } from '../StyledText';
import { Expanded } from './expandedFund';
import { RiskIcon } from './riskIcon';

// ✅ imports de animação
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface FundsCardProps {
  fund: FundoInvestimento;
  onPress: () => void;
  expanded: boolean;
  expandedType?: 'default' | 'simular';
  onSimulate?: () => void;
}

export const FundsCard = ({
  fund,
  onPress,
  expanded,
  expandedType = 'default',
  onSimulate,
}: FundsCardProps) => {
  const theme = useTheme();

  return (
    // 🔸 container agora é Animated.View, apenas para animar mudanças de layout
    <Animated.View
      layout={Layout.springify().damping(16).stiffness(140)}
      className="w-[380px] rounded-[15px] border box-border pt-[4px] pb-[2px] pr-[11px] pl-[4px] self-center shadow-md elevation-4"
      style={{ backgroundColor: theme.backgroundCards, borderColor: theme.border, borderWidth: 1 }}
    >
      <Pressable onPress={onPress}>
        <View className="flex flex-row justify-between">
          <StyledText className="text-md" style={{ color: theme.tint }}>
            {'Fundo' /* fund.type */}
          </StyledText>

          <View className="flex flex-row items-center gap-[10px]">
            <RiskIcon risk={'alto' /* fund.risk */} />
            {/* TODO integrar quando a api estiver pronta */}
          </View>
        </View>

        <View>
          <StyledText className="text-xl font-bold" style={{ color: theme.text }}>
            {fund.nome}
          </StyledText>
        </View>

        {/* 🔸 divisor animado (entra/saí com fade; layout suave) */}
        {expanded ? (
          <Animated.View
            entering={FadeIn.duration(90)}
            exiting={FadeOut.duration(120)}
            layout={Layout.springify().damping(18)}
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
          <StyledText className="text-lg" style={{ color: theme.tint }}>
            {/* TODO arrow icons */}
            {fund.taxaRentabilidade > 0 ? 
              <MaterialCommunityIcons name="arrow-up" size={16} color="green" />:
              <MaterialCommunityIcons name="arrow-down" size={16} color="red" />

            }
            {`${fund.taxaRentabilidade}%`}
            {/* TODO consultar se este valor esta em porcentagem */}
          </StyledText>
        </View>

        {/* 🔸 conteúdo expandido animado (sem mudar seu componente) */}
        {expanded ? (
          <Animated.View
            entering={FadeIn.duration(160)}
            exiting={FadeOut.duration(120)}
            layout={Layout.springify().damping(16).stiffness(140)}
          >
            <Expanded
              fund={fund}
              expanded={expanded}
              type={expandedType}
              onSimulate={onSimulate ? onSimulate : () => {}}
            />
          </Animated.View>
        ) : null}
      </Pressable>
    </Animated.View>
  );
};