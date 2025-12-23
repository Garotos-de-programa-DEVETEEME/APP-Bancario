import React, { useEffect, useMemo } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

import { FundoInvestimento } from "@/src/@Types/fundos";
import { useTheme } from "@/src/hooks/useTheme";
import { fundsColor } from "@/src/themes/fundosInvestdos";

// Componente animado do Circle
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface InvestmentChartProps {
  data: FundoInvestimento[];
  embedded?: boolean; // <- novo
}

interface SliceInfo {
  color: string;
  pct: number;     // 0..1
  offsetPct: number; // 0..1 (acumulado)
}

export const GraficWallet = ({ data }: InvestmentChartProps) => {
  const theme = useTheme();

  // === Dimensões do gráfico ===
  const size = 200;
  const strokeWidth = 30;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // === Normaliza dados em porcentagens e offsets ===
  const slices = useMemo<SliceInfo[]>(() => {
    if (!data || data.length === 0) return [];
    // TODO: alterar para patrimônio investido ao invés de `codigo`
    const totalValue = data.reduce((sum, item) => sum + item.codigoFundo, 0);
    if (totalValue === 0) return [];

    let acc = 0;
    return data.map((item) => {
      const color = fundsColor.find((o) => o.nome === item.nome)?.cor ?? "#999";
      const pct = item.codigoFundo / totalValue; // 0..1
      const info: SliceInfo = { color, pct, offsetPct: acc };
      acc += pct;
      return info;
    });
  }, [data]);

  // === Animação global de "desenho" ===
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 900,
      easing: Easing.out(Easing.cubic),
    });
  }, [data]);

  return (
    <View className="items-center justify-center mb-5">
      <Svg width={size} height={size}>
        {/* Trilha de fundo */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={theme?.border ?? "#e6e6e6"}
          fill="none"
          strokeLinecap="round"
        />

        {/* Fatias animadas */}
        {slices.map((slice, idx) => (
          <SliceArc
            key={`slice-${idx}`}
            cx={center}
            cy={center}
            radius={radius}
            strokeWidth={strokeWidth}
            circumference={circumference}
            color={slice.color}
            pct={slice.pct}
            offsetPct={slice.offsetPct}
            progress={progress}
          />
        ))}
      </Svg>
    </View>
  );
};

// Desenha 1 fatia com animação do comprimento
function SliceArc({
  cx,
  cy,
  radius,
  strokeWidth,
  circumference,
  color,
  pct,
  offsetPct,
  progress,
}: {
  cx: number;
  cy: number;
  radius: number;
  strokeWidth: number;
  circumference: number;
  color: string;
  pct: number;        // 0..1
  offsetPct: number;  // 0..1
  progress: Animated.SharedValue<number>;
}) {
  const animatedProps = useAnimatedProps(() => {
    // comprimento "alvo" da fatia
    const length = pct * circumference * progress.value;
    // gap é o resto do círculo
    const gap = circumference - length;

    // offset começa no topo (-90°) -> convertemos em deslocamento no dash
    const baseOffset = -offsetPct * circumference;
    // enquanto desenha, faz sentido animar ligeiro fade do início:
    const dashOffset = baseOffset;

    return {
      strokeDasharray: [length, gap] as unknown as string,
      strokeDashoffset: dashOffset,
      opacity: 0.3 + 0.7 * progress.value, // pequeno fade-in
    } as any;
  });

  return (
    <AnimatedCircle
      cx={cx}
      cy={cy}
      r={radius}
      strokeWidth={strokeWidth}
      stroke={color}
      fill="none"
      // começa no topo
      rotation={-90}
      originX={cx}
      originY={cy}
      animatedProps={animatedProps}
    />
  );
}
