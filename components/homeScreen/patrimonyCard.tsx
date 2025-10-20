import { useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { StyledText } from "../StyledText";
import { useTheme } from "@/hooks/useTheme";
import { coinFormat } from "@/utils/coinFormat";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type PatrimonyCardProps = {
  value: number;
  cointaned?: boolean;
};

export default function PatrimonyCard({ value, cointaned = false }: PatrimonyCardProps) {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  // animação de crossfade (0 = mascarado, 1 = visível)
  const progress = useSharedValue(1);

  // escala no botão do olho
  const eyeScale = useSharedValue(1);

  const containerStyle = useMemo(() => {
    if (cointaned) return { backgroundColor: "transparent" };
    return {
      backgroundColor: theme.background,
      elevation: 4,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
    };
  }, [cointaned, theme.background]);

  const onToggle = () => {
    const next = !isVisible;
    setIsVisible(next);
    progress.value = withTiming(next ? 1 : 0, {
      duration: 200,
      easing: Easing.out(Easing.ease),
    });
  };

  const aValue = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));
  const aMask = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
  }));

  const aEye = useAnimatedStyle(() => ({
    transform: [{ scale: eyeScale.value }],
  }));

  return (
    <View
      className={cointaned ? "w-full h-[90px] justify-center" : "w-full h-[90px] justify-center rounded-2xl"}
      style={containerStyle}
    >
      <View className="flex-row items-start justify-between pb-2 px-4">
        <View className="ml-1">
          <StyledText className="text-[18px]" style={{ color: theme.text, fontWeight: "700" as any }}>
            Meu Patrimônio
          </StyledText>

          <StyledText className="text-[15px] mt-1" style={{ color: theme.text, fontWeight: "400" as any }}>
            Saldo líquido
          </StyledText>

          <View className="mt-0.5 relative" style={{ height: 22 }}>
            <Animated.View style={[aValue, { position: "absolute", left: 0, right: 0 }]}>
              <StyledText className="text-[18px]" style={{ color: theme.text, fontWeight: "700" as any }}>
                {coinFormat(value)}
              </StyledText>
            </Animated.View>

            <Animated.View style={[aMask, { position: "absolute", left: 0, right: 0 }]}>
              <StyledText className="text-[18px]" style={{ color: theme.text, fontWeight: "700" as any }}>
                R$ ••••••
              </StyledText>
            </Animated.View>
          </View>
        </View>

        <TouchableOpacity
          accessibilityLabel={isVisible ? "Ocultar saldo" : "Mostrar saldo"}
          onPressIn={() => (eyeScale.value = withTiming(0.92, { duration: 80 }))}
          onPressOut={() => (eyeScale.value = withTiming(1, { duration: 80 }))}
          onPress={onToggle}
          className="mt-1 mr-1 p-1"
        >
          <Animated.View style={aEye}>
            <MaterialCommunityIcons
              name={isVisible ? "eye" : "eye-off"}
              size={20}
              color={theme.alternativeIcon}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
