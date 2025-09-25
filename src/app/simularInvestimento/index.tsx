import { FundoInvestimento } from '@/src/@Types/fundos';
import { FundsCard } from '@/src/components/fundCard/fundCard';
import { StyledText } from '@/src/components/StyledText';
import { MOCK_FUNDOS } from '@/src/data/fundos';
import { useTheme } from '@/src/hooks/useTheme';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

export default function SimularInvestimento() {
  const theme = useTheme();
  const investmentFunds = MOCK_FUNDOS;

  const [currentExpanded, setCurrentExpanded] = useState(-1);

  const changeCurrentExpanded = (key: number) => {
    if (key === currentExpanded) {
      setCurrentExpanded(-1);
      return;
    }
    setCurrentExpanded(key);
  };

  const handleSimulatePress = (fund: FundoInvestimento) => {
    router.push({
      pathname: '/simularInvestimento/detalhesFundo',
      params: { fundData: JSON.stringify(fund) },
    });
  };

  return (
    <View
      className="items-center h-full"
      style={{ backgroundColor: theme.background }}
    >
      <View
        className="w-[380px] h-[75px] rounded-[15px] justify-center items-center mb-[45px] mt-5 px-5 s"
        style={{ backgroundColor: theme.backgroundCards }}
      >
        <StyledText
          className="text-sm italic text-start font-medium"
          style={{ color: theme.alternativeText }}
        >
          A simulação considera seu perfil de investidor previamente cadastrado,
          garantindo maior adequação às suas preferências e tolerância a risco.
        </StyledText>
      </View>

      <View>
        <StyledText
          className="mb-[10px] text-xl font-bold"
          style={{ color: theme.darkText }}
        >
          Fundos
        </StyledText>

        <View className="gap-5">
          {investmentFunds.map((fund) => {
            return (
              <FundsCard
                fund={fund}
                key={fund.codigo}
                onPress={() => changeCurrentExpanded(fund.codigo)}
                expanded={currentExpanded === fund.codigo}
                expandedType="simular"
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}