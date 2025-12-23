import { FundsCard } from '@/src/components/fundCard/fundCard';
import { StyledText } from '@/src/components/StyledText';
import { MOCK_FUNDOS } from '@/src/data/fundos';
import { useTheme } from '@/src/hooks/useTheme';
import { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

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

  return (
    <View
      className="items-center h"
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="gap-5">
              {investmentFunds.listaFundos.map((fund) => {
                return (
                  <FundsCard
                    fund={fund}
                    key={fund.codigoFundo}
                    onPress={() => changeCurrentExpanded(fund.codigoFundo)}
                    expanded={currentExpanded === fund.codigoFundo}
                    expandedType="simular"
                  />
                );
              })}

          </View>
        </ScrollView>
      </View>
    </View>
  );
}