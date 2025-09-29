import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { WalletInfoCard } from "@/src/components/Wallet/carteira";
import { FundoInvestido } from "@/src/components/Wallet/fundoInvestido";
import { MOCK_FUNDOS } from "@/src/data/fundos";
import { useTheme } from "@/src/hooks/useTheme";

export default function WalletPage() {
  const theme = useTheme();
  const [fundosInvestidos, setFundosInvestidos] = useState<any[]>([]); // TODO: integrar com API

  useEffect(() => {
    setFundosInvestidos(MOCK_FUNDOS);
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Card "Carteira" */}
      <Animated.View
        entering={FadeInDown.duration(450).springify()}
        className="mt-9 mb-3 self-center w-[90%] rounded-2xl"
        style={{ backgroundColor: theme.backgroundCards }}
      >
        <WalletInfoCard fundosInvestidos={fundosInvestidos} />
      </Animated.View>

      {/* Lista de Fundos Investidos */}
      <Animated.View
        entering={FadeInDown.duration(450).delay(80).springify()}
        className="self-center w-[90%] rounded-2xl"
        style={{
          borderColor: theme.border,
          borderWidth: 1,
          paddingTop: 20,
          paddingBottom: 15,
          paddingHorizontal: 15,
        }}
      >
        <View className="flex-col gap-5">
          {fundosInvestidos.map((fundo, index) => {
            const key =
              (fundo?.id as string) ||
              (fundo?.codigo as string) ||
              `${fundo?.nome ?? "fundo"}-${index}`;

            return (
              <Animated.View
                key={key}
                entering={FadeInDown.duration(400).delay(120 + index * 70).springify()}
              >
                <FundoInvestido fundoData={fundo} />
              </Animated.View>
            );
          })}
        </View>
      </Animated.View>
    </ScrollView>
  );
}
