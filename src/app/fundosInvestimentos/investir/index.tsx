import { FundoInvestimento } from '@/src/@Types/fundos';
import { NavigationButton } from '@/src/components/Buttons/navigationButton';
import { DataLess } from '@/src/components/Dataless';
import { FundClass } from '@/src/components/InfoTexts/fundClass';
import { FundDetails } from '@/src/components/InfoTexts/fundDetails';
import { ResultRow } from '@/src/components/InfoTexts/resultRow';
import DropdownInput from '@/src/components/Input/dropdownInput';
import { InvestorProfile } from '@/src/components/Input/investorProfile';
import PriceInput from '@/src/components/Input/priceInput';
import { useTheme } from '@/src/hooks/useTheme';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
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
  const theme = useTheme();

  const [perfilPreenchido, setPerfilPreenchido] = useState(false);

  // Comunicação entre inputs e Pai
  const [valorSalvoDropdown, setValorSalvoDropdown] = useState('');
  const [valorAplicarEmCentavos, setValorAplicarEmCentavos] = useState(0);
  const [valorMensalOpcional, setValorMensalOpcional] = useState(0);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [dataAplicacao, setDataAplicacao] = useState('');
  const [dataResgate, setDataResgate] = useState('');
  // Bloqueio do botão sem info e se for menor que o mínimo
  const [isButtonEnabled, setButtonEnabbled] = useState(false);

  const fund: FundoInvestimento | null =
    typeof fundData === 'string' ? JSON.parse(fundData) : null;

  useEffect(() =>{
    setButtonEnabbled(fund
        ? valorAplicarEmCentavos >= fund.valorAplicacaoInicial * 100 && valorSalvoDropdown !== ''
        : false);
  },[valorSalvoDropdown, valorAplicarEmCentavos, fund])

  const handleShowResults = () => {
    const hoje = new Date();
    // Formata a data de aplicação com dia, mês e ano
    const diaAplicacao = String(hoje.getDate()).padStart(2, '0');
    const mesAplicacao = String(hoje.getMonth() + 1).padStart(2, '0');
    const anoAplicacao = hoje.getFullYear();
    setDataAplicacao(`${diaAplicacao}/${mesAplicacao}/${anoAplicacao}`);

    // Calcula a data de resgate
    const [quantidade, unidade] = valorSalvoDropdown.split(' ');
    const numQuantidade = parseInt(quantidade, 10);
    const dataFutura = new Date(hoje);

    if (unidade.includes('mês') || unidade.includes('mes')) {
      dataFutura.setMonth(hoje.getMonth() + numQuantidade);
    } else if (unidade.includes('ano')) {
      dataFutura.setFullYear(hoje.getFullYear() + numQuantidade);
    }

    // Formata a data de resgate com dia, mês e ano
    const diaFuturo = String(dataFutura.getDate()).padStart(2, '0');
    const mesFuturo = String(dataFutura.getMonth() + 1).padStart(2, '0');
    const anoFuturo = dataFutura.getFullYear();
    setDataResgate(`${diaFuturo}/${mesFuturo}/${anoFuturo}`);
    
    setMostrarResultados(true);
  };

  const handleProfileAccept = () => {
    setPerfilPreenchido(true);
  };

  return (
    <>
       <InvestorProfile
        visible={!perfilPreenchido}
        onClose={() => router.back()}
        onAccept={handleProfileAccept}
        clientName='Cliente'
        image='https://legacy.reactjs.org/logo-og.png'
        />

    {perfilPreenchido && (
      <>
      {!fund? (<DataLess/>):
      !mostrarResultados ? (
        // ===== TELA DE INVESTIMENTO =====
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
                placeholder={fund.valorAplicacaoInicial * 100}
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
                alternativeText="Opcional"
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

            <Animated.View
              layout={LinearTransition.springify().damping(16)}
              entering={FadeInDown.duration(160)}
              className="items-center mt-4"
            >
              <NavigationButton
                onPress={handleShowResults}
                text="Investir"
                width={261}
                height={37}
                disabled={!isButtonEnabled}
              />
            </Animated.View>

            <View className="h-8" />
          </View>
        </ScrollView>
      ) : (
        // ===== TELA DE RESULTADOS =====
        <ScrollView className="flex-1" style={{ backgroundColor: theme.background }}>
          <View className="flex-1 px-[25px] pb-[25px] pt-1">

            <Animated.View
              layout={LinearTransition.springify().damping(18)}
              entering={FadeInDown.duration(140)}
            >
              <FundDetails fund={fund} />
            </Animated.View>
            
            {/* Resultados */}
            <Animated.View
              layout={LinearTransition.springify().damping(18)}
              className="mt-6 mb-6 gap-4"
            >
              <ResultRow
                label="Aplicação inicial"
                value={formatCurrency(valorAplicarEmCentavos)}
              />
              <ResultRow
                label="Data de aplicação"
                value={dataAplicacao}
              />
              <ResultRow
                label="Data limite de resgate"
                value={dataResgate}
              />
            </Animated.View>

            <View className="h-8" />
          </View>
        </ScrollView>
      )}
    </>
    )}
    </>
  );
}