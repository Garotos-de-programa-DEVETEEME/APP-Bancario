import { FundoInvestimento } from '@/src/@Types/fundos'; // Verifique se este caminho está correto
import { StyledText } from '@/src/components/StyledText';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';

// TODO: Trocar essa tela placeholder com a tela oficial

export default function DetalhesInvestimento() {
  const { fundData } = useLocalSearchParams();

  const fund: FundoInvestimento | null =
    typeof fundData === 'string' ? JSON.parse(fundData) : null;

  return (
    <ScrollView className="bg-white">
      <Stack.Screen options={{ title: 'Detalhes do Fundo' }} />
      <View className="flex-1 p-5">
        {!fund ? (
          <StyledText> Erro: Dados do fundo não encontrados. </StyledText>
        ) : (
          <>
            <StyledText className="text-2xl font-bold mb-6 text-[#1A202C]">
              {fund.nome}
            </StyledText>

            <View className="flex-row justify-between py-4 border-b border-[#E2E8F0]">
              <StyledText className="text-base text-[#4A5568]">Aplicação Inicial</StyledText>
              <StyledText className="text-base font-semibold text-[#2D3748]">
                R$ {fund.valorAplicacaoInicial.toFixed(2)}
              </StyledText>
            </View>

            <View className="flex-row justify-between py-4 border-b border-[#E2E8F0]">
              <StyledText className="text-base text-[#4A5568]">Rentabilidade (12M)</StyledText>
              <StyledText className="text-base font-semibold text-[#2D3748]">
                {fund.taxaRentabilidade}%
              </StyledText>
            </View>

            <View className="flex-row justify-between py-4 border-b border-[#E2E8F0]">
              <StyledText className="text-base text-[#4A5568]">Taxa de Administração</StyledText>
              <StyledText className="text-base font-semibold text-[#2D3748]">
                {fund.taxaAdministracao}% a.a.
              </StyledText>
            </View>

            <View className="flex-row justify-between py-4 border-b border-[#E2E8F0]">
              <StyledText className="text-base text-[#4A5568]">Prazo de Resgate</StyledText>
              <StyledText className="text-base font-semibold text-[#2D3748]">
                D+{fund.prazoConversaoResgate} (Dias Úteis)
              </StyledText>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}