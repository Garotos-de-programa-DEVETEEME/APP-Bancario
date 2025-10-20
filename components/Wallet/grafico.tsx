import { FundoInvestimento } from "@/@Types/fundos";
import { fundosColor } from "@/constants/fundosInvestdos";
import { useTheme } from "@/hooks/useTheme";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface InvestmentChartProps {
  data: FundoInvestimento[];
  embedded?: boolean;
}

interface SliceInfo {
  color: string;
  pct: number; // 0..1
  offsetPct: number; // 0..1 (acumulado)
}

export const GraficWallet = ({ data }: InvestmentChartProps) => {
  const theme = useTheme();

  const size = 200;
  const strokeWidth = 30;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const slices = useMemo<SliceInfo[]>(() => {
    if (!data || data.length === 0) return [];
    const totalValue = data.reduce((sum, item) => sum + item.codigo, 0);
    if (totalValue === 0) return [];

    let acc = 0;
    return data.map((item) => {
      const color = fundosColor.find((o) => o.nome === item.nomeReduzido)?.cor ?? "#999";
      const pct = item.codigo / totalValue;
      const info: SliceInfo = { color, pct, offsetPct: acc };
      acc += pct;
      return info;
    });
  }, [data]);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={theme?.border ?? "#e6e6e6"}
          fill="none"
          strokeLinecap="round"
        />

        {slices.map((slice, idx) => {
          const length = slice.pct * circumference;
          const gap = Math.max(circumference - length, 0);
          const baseOffset = -slice.offsetPct * circumference;
          const strokeDasharray = `${length} ${gap}`;
          const strokeDashoffset = baseOffset;
          const opacity = 1; // static (animations removed)

          return (
            <Circle
              key={`slice-${idx}`}
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
              stroke={slice.color}
              fill="none"
              strokeLinecap="round"
              rotation={-90}
              originX={center}
              originY={center}
              strokeDasharray={strokeDasharray as any}
              strokeDashoffset={strokeDashoffset as any}
              opacity={opacity}
            />
          );
        })}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
