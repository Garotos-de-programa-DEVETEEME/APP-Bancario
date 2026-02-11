import { FundoInvestimento } from '@/src/@Types/fundos';
import { NavigationButton } from '@/src/components/Buttons/navigationButton';
import { DataLess } from '@/src/components/Dataless';
import { AcceptanceTerm } from '@/src/components/InfoTexts/acceptanceTerm';
import { FundClass } from '@/src/components/InfoTexts/fundClass';
import { FundDetails } from '@/src/components/InfoTexts/fundDetails';
import DropdownInput from '@/src/components/Input/dropdownInput';
import PriceInput from '@/src/components/Input/priceInput';
import { useTheme } from '@/src/hooks/useTheme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Animated, {
    FadeIn,
    FadeInDown,
    LinearTransition
} from 'react-native-reanimated';

const formatCurrency = (valueInCents: number) => {
  const valueInReais = valueInCents / 100;
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valueInReais);
};

export default function DetalhesInvestimento() {
  const { fundData } = useLocalSearchParams();
  const router = useRouter();
  const theme = useTheme();

  const modalizeRef = useRef<Modalize>(null);
  const [isChecked, setIsChecked] = useState(false);

  // Comunicação entre inputs e Pai
  const [valorSalvoDropdown, setValorSalvoDropdown] = useState('');
  const [valorAplicarEmCentavos, setValorAplicarEmCentavos] = useState(0);
  const [valorMensalOpcional, setValorMensalOpcional] = useState(0);
  
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const fund: FundoInvestimento | null =
    typeof fundData === 'string' ? JSON.parse(fundData) : null;

  // Bloqueio do botão sem info e se for menor que o mínimo
  const [isButtonEnabled, setButtonEnabbled] = useState(false);

  useEffect(() =>{
    setButtonEnabbled(fund
        ? valorAplicarEmCentavos >= fund.valorAplicacaoInicial * 100 && valorSalvoDropdown !== ''
        : false);
  },[valorSalvoDropdown, valorAplicarEmCentavos, fund]);

  const onOpenTermo = () => {
    modalizeRef.current?.open();
  };
  
  const handleShowResults = () => {
    modalizeRef.current?.close();
    setMostrarResultados(true);
  };

  return (
    <>
      {!fund? (<DataLess/>):
      !mostrarResultados ? (
        // ===== TELA DE SIMULAÇÃO =====
        <ScrollView
          className="flex-1"
          style={{ backgroundColor: theme.background }}
          showsHorizontalScrollIndicator={false}
        >
          <View className="flex-1 px-[25px] pb-[25px]">
            {/* Detalhes do Fundo */}
            <Animated.View
              layout={LinearTransition.springify().damping(18).stiffness(140)}
              entering={FadeIn.duration(140)}
              className="mb-2"
            >
              <FundDetails fund={fund} />
            </Animated.View>

            {/* Aplicação inicial */}
            <Animated.View
              layout={LinearTransition.springify().damping(18)}
              entering={FadeInDown.duration(160)}
              className="mt-4"
            >
              <Text
                className="font-bold"
                style={{ fontSize: 20, color: theme.text, marginTop: 15, marginBottom: 10 }}
              >
                Aplicação inicial
              </Text>
              <PriceInput
                value={valorAplicarEmCentavos}
                onValueChange={setValorAplicarEmCentavos}
                numericPlaceholder={fund.valorAplicacaoInicial * 100}
              />
            </Animated.View>

            {/* Data (prazo) */}
            <Animated.View
              layout={LinearTransition.springify().damping(18)}
              entering={FadeInDown.duration(160)}
              className="mt-4"
            >
              <Text
                className="font-bold"
                style={{ fontSize: 20, color: theme.text, marginTop: 15, marginBottom: 10 }}
              >
                Data
              </Text>
              <DropdownInput
                content={['1 mês', '3 meses', '6 meses', '1 ano', '3 anos', '5 anos']}
                placeholder="Tempo estimado"
                onValueChange={setValorSalvoDropdown}
              />
            </Animated.View>

            {/* Aplicação mensal */}
            <Animated.View
              layout={LinearTransition.springify().damping(18)}
              entering={FadeInDown.duration(160)}
              className="mt-4"
            >
              <Text
                className="font-bold"
                style={{ fontSize: 20, color: theme.text, marginTop: 15, marginBottom: 10 }}
              >
                Aplicação Mensal
              </Text>
              <PriceInput
                value={valorMensalOpcional}
                onValueChange={setValorMensalOpcional}
                textPlaceholder="Opcional"
              />
            </Animated.View>

            {/* Classe do Fundo */}
            <Animated.View
              layout={LinearTransition.springify().damping(18)}
              entering={FadeInDown.duration(160)}
              className="mt-5"
            >
              <FundClass fund={fund} />
            </Animated.View>

            {/* Botão Simular */}
            <Animated.View
              layout={LinearTransition.springify().damping(16)}
              entering={FadeInDown.duration(160)}
              className="items-center mt-4"
            >
              <NavigationButton
                onPress={onOpenTermo}
                text="Simular"
                width={261}
                height={37}
                disabled={!isButtonEnabled}
              />
            </Animated.View>

            <View className="h-8" />
          </View>

          <Modalize
                ref={modalizeRef}
                modalHeight={600}
                handleStyle={{ backgroundColor: theme.textSecundary }}
                modalStyle={{ backgroundColor: theme.backgroundCards }}
            >
                <AcceptanceTerm
                    isChecked={isChecked}
                    onToggleChecked={() => setIsChecked(!isChecked)}
                    onAccept={handleShowResults}
                />
            </Modalize>

        </ScrollView>
      ) : (
        // ===== TELA DE RESULTADOS =====
        <ScrollView className="flex-1" style={{ backgroundColor: theme.background }}>
          <View className="flex-1 px-[25px] pb-[25px] pt-1">
            {/* Título */}
            <Animated.View
              layout={LinearTransition.springify().damping(18).stiffness(140)}
              entering={FadeInDown.duration(160)}
              className="mb-2"
            >
              <Text
                className="font-bold"
                style={{ fontSize: 28, color: theme.text, fontFamily: 'Roboto', marginBottom: 15 }}
              >
                {fund.nome}
              </Text>
            </Animated.View>

            {/* Separador */}
            <Animated.View
              layout={LinearTransition.springify().damping(20)}
              entering={FadeIn.duration(140)}
              style={{ height: 1, backgroundColor: theme.border, marginBottom: 10, marginTop: 10 }}
            />

            {/* Linhas de detalhes */}
            <Animated.View
              layout={LinearTransition.springify().damping(18)}
              entering={FadeInDown.duration(140)}
              className="gap-1"
            >
              <View className="flex-row justify-between mb-[2px]">
                <Text style={{ fontSize: 15, color: theme.text }}>Aplicação Inicial:</Text>
                <Text style={{ fontSize: 13, fontWeight: '600', color: theme.text }}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    fund.valorAplicacaoInicial
                  )}
                </Text>
              </View>

              <View className="flex-row justify-between mb-[2px]">
                <Text style={{ fontSize: 15, color: theme.text }}>Rentabilidade dos últimos 12 meses:</Text>
                <Text style={{ fontSize: 15, color: '#4C9AFE' }}>{fund.taxaRentabilidade}%</Text>
              </View>

              <View className="flex-row justify-between mb-[2px]">
                <Text style={{ fontSize: 15, color: theme.text }}>Taxa Global:</Text>
                <Text style={{ fontSize: 13, fontWeight: '600', color: theme.text }}>
                  {fund.taxaAdministracao}% a.a.
                </Text>
              </View>

              <View className="flex-row justify-between mb-[2px]">
                <Text style={{ fontSize: 15, color: theme.text }}>Hora limite da aplicação:</Text>
                <Text style={{ fontSize: 13, fontWeight: '600', color: theme.text }}>
                  {fund.horaLimite}
                </Text>
              </View>

              <View className="flex-row justify-between mb-[2px]">
                <Text style={{ fontSize: 15, color: theme.text }}>Movimentação (aplic/resg):</Text>
                <Text style={{ fontSize: 13, fontWeight: '600', color: theme.text }}>
                  {/* evita divisão por 0/undefined */}
                  {(() => {
                    const a = fund.valorMinimoAplicacaoInternet ?? 0;
                    const r = fund.valorMinimoResgateInternet ?? 1;
                    return `R$ ${(a / r).toFixed(2)}`;
                  })()}
                </Text>
              </View>

              <View className="flex-row justify-between mb-[2px]">
                <Text style={{ fontSize: 15, color: theme.text }}>Cotatização de resgate:</Text>
                <Text style={{ fontSize: 13, fontWeight: '600', color: theme.text }}>
                  D+30 (Dias Corridos)
                </Text>
              </View>

              <View className="flex-row justify-between mb-[2px]">
                <Text style={{ fontSize: 15, color: theme.text }}>Liquidação de resgate:</Text>
                <Text style={{ fontSize: 13, fontWeight: '600', color: theme.text }}>
                  D+10 (Dias Úteis)
                </Text>
              </View>
            </Animated.View>

            {/* Resultados */}
            <Animated.View
              layout={LinearTransition.springify().damping(18)}
              className="mt-6 mb-6 gap-4"
            >
              <Animated.View
                entering={FadeInDown.duration(140)}
                layout={LinearTransition.springify().damping(18)}
                className="rounded-2xl p-4 min-h-[46px] flex-row items-center justify-between shadow elevation-2"
                style={{ backgroundColor: theme.backgroundCards }}
              >
                <Text className="font-bold" style={{ fontSize: 18, color: theme.text }}>
                  Aplicação inicial
                </Text>
                <Text className="font-bold" style={{ fontSize: 18, color: theme.text }}>
                  {formatCurrency(valorAplicarEmCentavos)}
                </Text>
              </Animated.View>

              <Animated.View
                entering={FadeInDown.duration(160)}
                layout={LinearTransition.springify().damping(18)}
                className="rounded-2xl p-4 min-h-[46px] flex-row items-center justify-between shadow elevation-2"
                style={{ backgroundColor: theme.backgroundCards }}
              >
                <Text className="font-bold" style={{ fontSize: 18, color: theme.text }}>
                  Resgate
                </Text>
                <Text className="font-bold" style={{ fontSize: 18, color: theme.text }}>
                  {/* Placeholder do resultado */}
                  {formatCurrency(valorAplicarEmCentavos + valorAplicarEmCentavos * 0.1)}
                </Text>
              </Animated.View>
            </Animated.View>

            {/* Pitch */}
            <View className="items-center mb-2">
              <Text style={{ fontSize: 12, fontStyle: 'italic', color: theme.textSecundary }}>
                Deseja utilizar esses valores para um investimento real?
              </Text>
            </View>

            {/* CTA */}
            <Animated.View
              layout={LinearTransition.springify().damping(16)}
              entering={FadeInDown.duration(140)}
              className="items-center mt-2"
            >
              <NavigationButton
                onPress={() => router.push('/telaInicial')}/* TODO redirecionar pagina investir */
                text="Aplicar Investimento"
                width={261}
                height={37}
              />
            </Animated.View>

            <View className="h-8" />
          </View>
        </ScrollView>
      )}
    </>
  );
}
