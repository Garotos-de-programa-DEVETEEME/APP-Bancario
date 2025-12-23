import { useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  Easing,
  FadeInDown,
  FadeOutUp,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { FundoInvestimento } from "@/src/@Types/fundos";
import { StylesType as themeType } from "@/src/@Types/stylesType";
import { useTheme } from "@/src/hooks/useTheme";
import { coinFormat } from "@/src/utils/coinFormat";
import { converterNumeroParaHora as hourFormater } from "@/src/utils/hourFormat";
import { router } from "expo-router";
import { NavigationButton } from "../Buttons/navigationButton";
import { StyledText } from "../StyledText";

interface FundoInvestidoProps {
  fundoData: FundoInvestimento;
  expanded: boolean;
  setExpanded: () => void
}

export const FundoInvestido = ({ fundoData, expanded, setExpanded }: FundoInvestidoProps) => {
  const theme = useTheme();

  const scale = useSharedValue(1);
  const aScale = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const rot = useSharedValue(0);
  const aChevron = useAnimatedStyle(() => ({ transform: [{ rotate: `${rot.value}deg` }] }));

  const toggle = () => {
    setExpanded();
    rot.value = withTiming(expanded ? 0 : 180, { duration: 220, easing: Easing.out(Easing.cubic) });
  };

  const cardShadow = useMemo(
    () => ({ elevation: 4, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } }),
    []
  );

  return (
    <Animated.View
      entering={FadeInDown.duration(320)}
      layout={Layout.springify().damping(18)}
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: theme.backgroundCards, borderColor: theme.border, borderWidth: 1, ...cardShadow }}
    >
      {/* header (sem linha inferior e sem ripple) */}
      <Pressable
        onPressIn={() => (scale.value = withTiming(0.98, { duration: 100 }))}
        onPressOut={() => (scale.value = withTiming(1, { duration: 100 }))}
        onPress={toggle}
      >
        <Animated.View style={[aScale]} className="px-4 py-3.5">
          <View className="flex-row items-center">
            <View className="flex-1">
              <StyledText className="text-[12px]" style={{ color: theme.tint, fontWeight: "500" as any }}>
                Fundo Simples
              </StyledText>
              <StyledText className="text-[20px] mt-0.5" style={{ color: theme.text, fontWeight: "600" as any }} numberOfLines={1}>
                {fundoData.nomeReduzido}
              </StyledText>
            </View>
          </View>
        </Animated.View>
      

      {/* linhas */}
      <View className="px-4 pt-3 pb-1">
        <InfoRow theme={theme} title="Valor Investido" value={coinFormat(fundoData.valorSaldoResgatavelCliente)} />
        <Divider color={theme.border} />
        <InfoRow theme={theme} title="Valor mínimo de resgate" value={coinFormat(fundoData.valorMinimoResgateInternet)} />
        <Divider color={theme.border} />
        <InfoRow theme={theme} title="Horário limite de resgate" value={hourFormater(fundoData.horaLimite)} noBottom />
      </View>

      {/* expandido — saída mais suave */}
      {expanded && (
        <Animated.View
          entering={FadeInDown.duration(260).easing(Easing.out(Easing.cubic))}
          exiting={FadeOutUp.duration(260).easing(Easing.inOut(Easing.cubic))}
          className="px-4 pb-4"
        >
          <View className="flex-row justify-center mt-1.5">
            <NavigationButton
              onPress={() =>
                router.push({
                  pathname: "/carteira/resgatar",
                  params: {
                    saldo: fundoData.valorSaldoResgatavelCliente,
                    valorMinimoPermanencia: fundoData.valorSaldoMinimoPermanencia,
                    valorMinimoResgate: fundoData.valorMinimoResgateInternet,
                  },
                })
              }
              text="Resgatar"
            />
          </View>
        </Animated.View>
      )}
      </Pressable>
    </Animated.View>
    
  );
};

function InfoRow({
  title,
  value,
  theme,
  noBottom,
}: {
  title: string;
  value: string;
  theme: themeType;
  noBottom?: boolean;
}) {
  return (
    <View className={noBottom ? "flex-row items-baseline justify-between py-1.5" : "flex-row items-baseline justify-between py-1.5 mb-1"}>
      <StyledText className="text-[13px]" style={{ color: theme.text }}>
        {title}
      </StyledText>
      <StyledText className="text-[15px]" style={{ color: theme.text, fontWeight: "700" as any }}>
        {value}
      </StyledText>
    </View>
  );
}

function Divider({ color }: { color: string }) {
  return <View className="my-1" style={{ height: 1, backgroundColor: color }} />;
}
