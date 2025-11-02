import { StylesType } from '@/@Types/stylesType';
import { useTheme } from '@/hooks/useTheme';
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

export interface Fundo {
  nome: String;
  valor: number;
}

interface FundoWithColor extends Fundo {
  color: String;
}

interface MeuPatrimonioProps {
  fundos: Fundo[];
  isValorVisivel: boolean;
  onToggleVisibilidade: () => void;
  onVerComprovantesPress: () => void;
}

const GOLDEN_RATIO_CONJUGATE = 0.618033988749895;
const HUE_INICIAL = 0.4;

const gerarCorUnica = (index: number): string => {
  // Calcula o "Hue" (tom) baseado no índice e na proporção áurea
  const hue = (HUE_INICIAL + index * GOLDEN_RATIO_CONJUGATE) % 1;

  const H = Math.floor(hue * 360);
  const S = 70;
  const L = 55;

  return `hsl(${H}, ${S}%, ${L}%)`;
};

export const MeuPatrimonio: React.FC<MeuPatrimonioProps> = ({
  fundos,
  isValorVisivel,
  onToggleVisibilidade,
  onVerComprovantesPress,
}) => {
  const theme = useTheme();
  const styles = getStyle(theme);
  const fundosComCor = useMemo<FundoWithColor[]>(() => {
    return fundos.map((fundo, index) => {
    const color = gerarCorUnica(index);

      return {
        ...fundo,
        color: color,
      };
    });
  }, [fundos]);
  const saldoLiquido = useMemo(
    () =>
      fundos.reduce((acc, fundo) => acc + fundo.valor, 0),
    [fundos],
  );

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Meu Patrimônio</Text>
        <TouchableOpacity onPress={onToggleVisibilidade} hitSlop={10}>
          <Feather
            name={isValorVisivel ? 'eye' : 'eye-off'}
            size={24}
            color="#555"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.saldoLabel}>Saldo líquido</Text>
      <View style={styles.saldoContainer}>
        <Text style={styles.saldoCurrency}>R$ </Text>
        {isValorVisivel ? (
          <Text style={styles.saldoValue}>{formatarMoeda(saldoLiquido)}</Text>
        ) : (
          <Text style={styles.saldoValue}>●●●●●</Text>
        )}
      </View>

      <TouchableOpacity
        onPress={onVerComprovantesPress}
        style={styles.linkButton}
      >
        <Text style={styles.linkText}>Ver comprovantes</Text>
        <Feather name="chevron-right" size={16} color="#007AFF" />
      </TouchableOpacity>

      <View style={styles.separator} />

      <Text style={styles.valoresTitle}>Valores</Text>
      <View style={styles.chartContainer}>
        <GraficWallet data={fundosComCor} />        
      </View>

      <View style={styles.legendContainer}>
        {fundosComCor.map((fundo) => (
          <View style={styles.legendItem} key={fundo.nome}>
            <View
              style={[styles.legendDot, { backgroundColor: fundo.color }]}
            />
            <Text style={styles.legendText}>{fundo.nome}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

function getStyle(theme: StylesType) {
  return StyleSheet.create({
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      padding: 16,
      margin: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
    },
    saldoLabel: {
      fontSize: 14,
      color: '#666',
    },
    saldoContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginTop: 4,
    },
    saldoCurrency: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginRight: 4,
    },
    saldoValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      letterSpacing: 1,
    },
    linkButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 16,
    },
    linkText: {
      fontSize: 16,
      color: '#007AFF',
      marginRight: 4,
    },
    separator: {
      height: 1,
      backgroundColor: '#EEEEEE',
      marginVertical: 16,
    },
    valoresTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 16,
    },
    chartContainer: {
      alignItems: 'center',
      marginBottom: 24,
    },
    legendContainer: {},
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    legendDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 10,
    },
    legendText: {
      fontSize: 14,
      color: '#555',
    },
  });
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface InvestmentChartProps {
  data: FundoWithColor[];
}

interface SliceInfo {
  color: string;
  pct: number;     // 0..1
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
    const totalValue = data.reduce((sum, item) => sum + item.valor, 0);
    if (totalValue === 0) return [];

    let acc = 0;
    return data.map((item) => {
      const color = item.color
      const pct = item.valor / totalValue; // 0..1
      const info: SliceInfo = { color, pct, offsetPct: acc };
      acc += pct;
      return info;
    });
  }, [data]);

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
        <Circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={theme?.border ?? "#e6e6e6"}
          fill="none"
          strokeLinecap="round"
        />

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
    const length = pct * circumference * progress.value;
    const gap = circumference - length;

    const baseOffset = -offsetPct * circumference;
    const dashOffset = baseOffset;

    return {
      strokeDasharray: [length, gap] as unknown as string,
      strokeDashoffset: dashOffset,
      opacity: 0.3 + 0.7 * progress.value,
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
      rotation={-90}
      originX={cx}
      originY={cy}
      animatedProps={animatedProps}
    />
  );
}

export default MeuPatrimonio;