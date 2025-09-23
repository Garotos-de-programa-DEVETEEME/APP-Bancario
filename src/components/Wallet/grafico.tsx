import { FundoInvestimento } from '@/src/@Types/fundos';
import { useTheme } from '@/src/hooks/useTheme';
import { fundsColor } from '@/src/themes/fundosInvestdos';
import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface InvestmentChartProps {
  data: FundoInvestimento[];
}

// Descreve a estrutura dos dados calculados para cada fatia do gráfico
interface ChartSlice {
  pathData: string;
  color: string;
}

export const GraficWallet = ({ data }: InvestmentChartProps) => {
  const theme = useTheme();
  const styles = getStyles();

  const size = 200;
  const strokeWidth = 30;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;

  const graphicData = useMemo<ChartSlice[]>(() => {
    const totalValue = data.reduce((sum, item) => sum + item.codigo, 0);

    if (!data || data.length === 0) return [];
    let cumulativeAngle = 0;

    return data.map((item): ChartSlice => {
      const color =
        fundsColor.find((object) => object.nome === item.nomeReduzido)?.cor ??
        '';

      const percentage = item.codigo / totalValue; //TODO alterar para patrimonio investido
      const angle = percentage * 360;

      const startAngleRad = (cumulativeAngle - 90) * (Math.PI / 180);
      const endAngleRad = (cumulativeAngle + angle - 90) * (Math.PI / 180);

      const startX = center + radius * Math.cos(startAngleRad);
      const startY = center + radius * Math.sin(startAngleRad);
      const endX = center + radius * Math.cos(endAngleRad);
      const endY = center + radius * Math.sin(endAngleRad);

      const largeArcFlag = angle > 180 ? 1 : 0;

      const pathData = [
        `M ${startX} ${startY}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      ].join(' ');

      cumulativeAngle += angle;

      return {
        pathData,
        color,
      };
    });
  }, [data]);
  console.log(graphicData);

  return (
    <View style={styles.chartContainer}>
      <Svg width={size} height={size}>
        <Path
          d={`M ${center} ${center - radius} A ${radius} ${radius} 0 1 1 ${center - 0.01} ${center - radius}`}
          stroke='#e6e6e6'
          strokeWidth={strokeWidth}
          fill='none'
        />
        {graphicData.map((slice: ChartSlice, index) => (
          <Path
            key={index}
            d={slice.pathData}
            stroke={slice.color}
            strokeWidth={strokeWidth}
            fill='none'
          />
        ))}
      </Svg>
    </View>
  );
};

// Os estilos continuam os mesmos
const getStyles = () => {
  return StyleSheet.create({
    chartContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
  });
};
