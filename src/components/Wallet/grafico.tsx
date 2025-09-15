import { FundoInvestimento } from '@/src/@Types/fundos';
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface InvestmentChartProps {
  data: FundoInvestimento[];
}

// Descreve a estrutura dos dados calculados para cada fatia do gráfico
interface ChartSlice {
  pathData: string;
  color: string;
}


export const InvestmentChart = ({ data }: InvestmentChartProps) => {
  // --- Constantes de configuração do Gráfico ---
  const size = 200;
  const strokeWidth = 30;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;

  // --- Lógica para calcular os caminhos do SVG ---
  // useMemo garante que este cálculo pesado só seja refeito quando a 'data' mudar.
  // Tipamos o retorno do useMemo como um array de ChartSlice.
  const chartData = useMemo<ChartSlice[]>(() => {
    if (!data || data.length === 0) {
      return [];
    }
    
    const totalValue = data.reduce((sum, item) => sum + item.valorAplicacaoInicial, 0);//TODO alterar valor aplicação por valor api
    if (totalValue === 0) return [];

    let cumulativeAngle = 0;

    return data.map((item): ChartSlice => {
      const percentage = item.value / totalValue;
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
      
      const color = COLOR_MAP[item.name] || COLOR_MAP.default;

      cumulativeAngle += angle;

      return {
        pathData,
        color,
      };
    });
  }, [data, radius, center]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.headerLink}>
        <Text style={styles.headerLinkText}>Ver comprovantes &gt;</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Valores</Text>

      <View style={styles.chartContainer}>
        <Svg width={size} height={size}>
          <Path
            d={`M ${center} ${center - radius} A ${radius} ${radius} 0 1 1 ${center - 0.01} ${center - radius}`}
            stroke="#e6e6e6"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {chartData.map((slice, index) => (
            <Path
              key={index}
              d={slice.pathData}
              stroke={slice.color}
              strokeWidth={strokeWidth}
              fill="none"
            />
          ))}
        </Svg>
      </View>

      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColorDot, { backgroundColor: COLOR_MAP[item.name] || COLOR_MAP.default }]} />
            <Text style={styles.legendText}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// Os estilos continuam os mesmos
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f4f7',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerLink: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  headerLinkText: {
    color: '#007bff',
    fontSize: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  legendContainer: {
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#555',
  },
});
