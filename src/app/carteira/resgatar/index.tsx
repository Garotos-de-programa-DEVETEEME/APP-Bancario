import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

import { NavigationButton } from "@/src/components/Buttons/navigationButton";
import { SwitchButton } from "@/src/components/Buttons/switch";
import PriceInput from "@/src/components/Input/priceInput";
import { StyledText } from "@/src/components/StyledText";
import { useTheme } from "@/src/hooks/useTheme";
import { coinFormat } from "@/src/utils/coinFormat";

export default function ResgatarPage() {
  const theme = useTheme();

  // params (string -> number)
  const {
    saldo = 0,
    valorMinimoPermanencia = 0,
    valorMinimoResgate = 0,
  } = useLocalSearchParams();

  const saldoNum = Number(saldo);
  const valorMinimoPermanenciaNum = Number(valorMinimoPermanencia);
  const valorMinimoResgateNum = Number(valorMinimoResgate);

  const [valorResgate, setValorResgate] = useState(0);
  const [resgatarTudo, setResgatarTudo] = useState(false);

  useEffect(() => {
    setValorResgate(resgatarTudo ? saldoNum * 100 : 0);
  }, [resgatarTudo, saldoNum]);

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <View className="mx-4">
        {/* Título + input */}
        <View className="gap-5 my-11">
          <StyledText className="text-[24px]" style={{ color: theme.text }}>
            Qual{" "}
            <StyledText className="text-[24px]" style={{ color: theme.text, fontWeight: "700" as any }}>
              Valor
            </StyledText>{" "}
            deseja resgatar?
          </StyledText>

          <PriceInput
            value={valorResgate}
            onValueChange={setValorResgate}
            placeholder={valorResgate}
            // mantém seu estilo, só convertido
            alternativeStyle={{
              backgroundColor: "transparent",
              fontSize: 40,
              borderBottomColor: theme.tint,
              borderBottomWidth: 1,
            }}
          />
        </View>

        {/* Switch: Resgatar tudo */}
        <View className="flex-row items-center justify-between mb-10">
          <StyledText className="text-[20px]" style={{ color: theme.text }}>
            Resgatar valor total
          </StyledText>
          <SwitchButton value={resgatarTudo} onValueChange={setResgatarTudo} />
        </View>

        {/* Infos */}
        <View className="gap-2">
          <Row
            themeText={theme.text}
            left="Disponível para resgate"
            right={coinFormat(saldoNum)}
          />
          <Row
            themeText={theme.text}
            left="Saldo mínimo de permanência"
            right={coinFormat(valorMinimoPermanenciaNum)}
          />
          <Row
            themeText={theme.text}
            left="Valor mínimo de resgate"
            right={coinFormat(valorMinimoResgateNum)}
          />
        </View>

        {/* Rodapé */}
        <View className="items-center mt-40 gap-8">
          <View className="items-center">
            <StyledText className="text-[16px]" style={{ color: theme.text }}>
              O resgate desse fundo pode ser realizado até
            </StyledText>
            <StyledText className="text-[16px]" style={{ color: theme.text }}>
              às{" "}
              <StyledText className="text-[16px]" style={{ fontWeight: "700" as any, color: theme.text }}>
                17:00 em dias úteis
              </StyledText>
            </StyledText>
          </View>

          {/* LINHA CORRIGIDA ABAIXO */}
          <NavigationButton onPress={() => router.push('/carteira')} text="Continuar" />
        </View>
      </View>
    </View>
  );
}

function Row({ themeText, left, right }: { themeText: string; left: string; right: string }) {
  return (
    <View className="flex-row items-center justify-between">
      <StyledText className="text-[16px]" style={{ color: themeText }}>
        {left}
      </StyledText>
      <StyledText className="text-[16px]" style={{ color: themeText }}>
        {right}
      </StyledText>
    </View>
  );
}