import { useMemo } from "react";
import { View } from "react-native";
import { StyledText } from "../StyledText";
import PatrimonyCard from "../homeScreen/patrimonyCard";
import { GraficWallet } from "./grafico";
import { useTheme } from "@/hooks/useTheme";
import { FundoInvestimento } from "@/@Types/fundos";
import { fundosColor } from "@/constants/fundosInvestdos";

interface WalletInfoCardProps {
  fundosInvestidos: FundoInvestimento[];
}

export const WalletInfoCard = ({ fundosInvestidos }: WalletInfoCardProps) => {
  const theme = useTheme();

  const isEmpty = !fundosInvestidos || fundosInvestidos.length === 0;
  const cardShadow = useMemo(
    () => ({ elevation: 4, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } }),
    []
  );
  

  return (
    <View
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: theme.backgroundCards,
        borderColor: theme.border,
        borderWidth: 1,
        ...cardShadow,
      }}
    >
      {/* Cabeçalho / Patrimônio */}
      <View style={{ borderBottomColor: theme.border, borderBottomWidth: 1 }}>
        <PatrimonyCard value={100} cointaned={true} />
      </View>

      {/* Seção: Valores + Gráfico */}
      <View className="px-4 pt-3 pb-2">
        <StyledText className="text-[15px] mb-3" style={{ color: theme.text }}>
          Valores
        </StyledText>

        <View className="items-center justify-center">
          {/*<GraficWallet data={fundosInvestidos} embedded />*/}
        </View>
      </View>

      {/* Legenda */}
      <View className="px-4 pb-3">
        {isEmpty ? (
          <StyledText className="text-[12px]" style={{ color: theme.tint }}>
            Nenhum fundo encontrado.
          </StyledText>
        ) : (
          fundosInvestidos.map((fundo, index) => {
            const cor =
              fundosColor.find((i) => i.nome === fundo.nomeReduzido)?.cor ??
              theme.tint;

            const isLast = index === fundosInvestidos.length - 1;
            const key =
              (fundo as any)?.id ??
              (fundo as any)?.codigo ??
              `${fundo?.nomeReduzido ?? "fundo"}-${index}`;

            return (
              <View key={key} className="py-2">
                <View className="flex-row items-center gap-2">
                  <View
                    className="w-[14px] h-[14px] rounded-full"
                    style={{ backgroundColor: cor }}
                  />
                  <StyledText
                    className="text-[14px] flex-1"
                    style={{ color: theme.text }}
                    numberOfLines={1}
                  >
                    {fundo.nome}
                  </StyledText>
                </View>

                {/* Divider sutil entre itens (não no último) */}
                {!isLast && (
                  <View
                    className="mt-2"
                    style={{ height: 1, backgroundColor: theme.text }}
                  />
                )}
              </View>
            );
          })
        )}
      </View>
    </View>
  );
};
