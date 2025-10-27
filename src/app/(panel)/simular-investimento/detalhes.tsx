import { FundoInvestimento } from '@/@Types/fundos';
import { BaseScreen } from '@/components/BaseScreen/BaseScreen';
import { ScreenStates } from '@/components/BaseScreen/ScreenStates';
import { NavigationButton } from '@/components/Buttons/navigationButton';
import { AcceptanceTerm } from '@/components/InfoTexts/acceptanceTerm';
import { FundClass } from '@/components/InfoTexts/fundClass';
import { FundDetails } from '@/components/InfoTexts/fundDetails';
import DropdownInput from '@/components/Input/dropdownInput';
import PriceInput from '@/components/Input/priceInput';
import { useTheme } from '@/hooks/useTheme';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

const formatCurrency = (valueInCents: number) => {
  const valueInReais = valueInCents / 100;
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valueInReais);
};

export default function DetalhesInvestimento() {
  const { fundData } = useLocalSearchParams();
  const theme = useTheme();
  const styles = getStyles(theme);

  const modalizeRef = useRef<Modalize>(null);
  const [isChecked, setIsChecked] = useState(false);

  const [valorSalvoDropdown, setValorSalvoDropdown] = useState('');
  const [valorAplicarEmCentavos, setValorAplicarEmCentavos] = useState(0);
  const [valorMensalOpcional, setValorMensalOpcional] = useState(0);

  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [fund, setFund] = useState<FundoInvestimento | null>(null);

  const [screenState, setScreenState] = useState(ScreenStates.loading());

  // Bloqueio do botão sem info e se for menor que o mínimo
  const [isButtonEnabled, setButtonEnabbled] = useState(false);

  useEffect(() => {
    if (typeof fundData === 'string') {
      try {
        const parsedFund: FundoInvestimento = JSON.parse(fundData);
        setFund(parsedFund);
        setScreenState(ScreenStates.content());
      } catch (e) {
        console.error("Erro ao parsear dados do fundo:", e);
        setScreenState(ScreenStates.error("Não foi possível carregar os dados do fundo."));
      }
    } else {
      setScreenState(ScreenStates.error("Dados do fundo não encontrados."));
    }
  }, [fundData]);


  useEffect(() => {
    setButtonEnabbled(fund
      ? valorAplicarEmCentavos >= fund.valorAplicacaoInicial * 100 && valorSalvoDropdown !== ''
      : false);
  }, [valorSalvoDropdown, valorAplicarEmCentavos, fund]);

  const onOpenTermo = () => {
    modalizeRef.current?.open();
  };

  const handleShowResults = () => {
    modalizeRef.current?.close();
    setMostrarResultados(true);
  };

  // Renderiza a tela principal
  const renderContent = () => {
    if (!fund) return null; // Isso é seguro por causa do BaseScreen

    return !mostrarResultados ? (
      // ===== TELA DE SIMULAÇÃO =====
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {/* Detalhes do Fundo */}
          <View style={styles.marginBottom2}>
            <FundDetails fund={fund} />
          </View>

          {/* Aplicação inicial */}
          <View style={styles.marginTop4}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Aplicação inicial
            </Text>
            <PriceInput
              value={valorAplicarEmCentavos}
              onValueChange={setValorAplicarEmCentavos}
              placeholder={fund.valorAplicacaoInicial * 100}
            />
          </View>

          {/* Data (prazo) */}
          <View style={styles.marginTop4}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Data
            </Text>
            <DropdownInput
              content={['1 mês', '3 meses', '6 meses', '1 ano', '3 anos', '5 anos']}
              placeholder="Tempo estimado"
              onValueChange={setValorSalvoDropdown}
            />
          </View>

          {/* Aplicação mensal */}
          <View style={styles.marginTop4}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Aplicação Mensal
            </Text>
            <PriceInput
              value={valorMensalOpcional}
              onValueChange={setValorMensalOpcional}
              alternativeText="Opcional"
            />
          </View>

          {/* Classe do Fundo */}
          <View style={styles.marginTop5}>
            <FundClass fund={fund} />
          </View>

          {/* Botão Simular */}
          <View style={styles.buttonContainer}>
            <NavigationButton
              onPress={onOpenTermo}
              text="Simular"
              width={261}
              height={37}
              disabled={!isButtonEnabled}
            />
          </View>

          <View style={styles.spacer} />
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
      <ScrollView style={styles.container}>
        <View style={styles.contentContainerResult}>
          {/* Título */}
          <View style={styles.marginBottom2}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>
              {fund.nome}
            </Text>
          </View>

          {/* Separador */}
          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          {/* Linhas de detalhes */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={[styles.detailTextLeft, { color: theme.text }]}>Aplicação Inicial:</Text>
              <Text style={[styles.detailTextRight, { color: theme.text }]}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  fund.valorAplicacaoInicial
                )}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={[styles.detailTextLeft, { color: theme.text }]}>Rentabilidade dos últimos 12 meses:</Text>
              <Text style={{ fontSize: 15, color: '#4C9AFE' }}>{fund.taxaRentabilidade}%</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={[styles.detailTextLeft, { color: theme.text }]}>Taxa Global:</Text>
              <Text style={[styles.detailTextRight, { color: theme.text }]}>
                {fund.taxaAdministracao}% a.a.
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={[styles.detailTextLeft, { color: theme.text }]}>Hora limite da aplicação:</Text>
              <Text style={[styles.detailTextRight, { color: theme.text }]}>
                {fund.horaLimite}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={[styles.detailTextLeft, { color: theme.text }]}>Movimentação (aplic/resg):</Text>
              <Text style={[styles.detailTextRight, { color: theme.text }]}>
                {(() => {
                  const a = fund.valorMinimoAplicacaoInternet ?? 0;
                  const r = fund.valorMinimoResgateInternet ?? 1;
                  return `R$ ${(a / r).toFixed(2)}`;
                })()}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={[styles.detailTextLeft, { color: theme.text }]}>Cotatização de resgate:</Text>
              <Text style={[styles.detailTextRight, { color: theme.text }]}>
                D+30 (Dias Corridos)
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={[styles.detailTextLeft, { color: theme.text }]}>Liquidação de resgate:</Text>
              <Text style={[styles.detailTextRight, { color: theme.text }]}>
                D+{fund.prazoConversaoResgate} (Dias Úteis)
              </Text>
            </View>
          </View>

          {/* Resultados */}
          <View style={styles.resultsSection}>
            <View style={[styles.resultCard, { backgroundColor: theme.backgroundCards }]}>
              <Text style={[styles.resultCardText, { color: theme.text }]}>
                Aplicação inicial
              </Text>
              <Text style={[styles.resultCardText, { color: theme.text }]}>
                {formatCurrency(valorAplicarEmCentavos)}
              </Text>
            </View>

            <View style={[styles.resultCard, { backgroundColor: theme.backgroundCards }]}>
              <Text style={[styles.resultCardText, { color: theme.text }]}>
                Resgate
              </Text>
              <Text style={[styles.resultCardText, { color: theme.text }]}>
                {/* Placeholder do resultado */}
                {formatCurrency(valorAplicarEmCentavos + valorAplicarEmCentavos * 0.1)}
              </Text>
            </View>
          </View>

          {/* Pitch */}
          <View style={styles.pitchTextContainer}>
            <Text style={[styles.pitchText, { color: theme.textSecundary }]}>
              Deseja utilizar esses valores para um investimento real?
            </Text>
          </View>

          {/* CTA */}
          <View style={styles.finalButtonContainer}>
            <NavigationButton
              onPress={() => console.log('Pressionado')}/* TODO redirecionar pagina investir */
              text="Aplicar Investimento"
              width={261}
              height={37}
            />
          </View>

          <View style={styles.spacer} />
        </View>
      </ScrollView>
    );
  }

  return (
    BaseScreen({
      state: screenState,
      children: (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          {renderContent()}
        </View>
      )
    })
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 25,
    paddingBottom: 25,
  },
  contentContainerResult: {
    flex: 1,
    paddingHorizontal: 25,
    paddingBottom: 25,
    paddingTop: 4,
  },
  marginBottom2: {
    marginBottom: 8,
  },
  marginTop4: {
    marginTop: 16,
  },
  marginTop5: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: theme.text,
    marginTop: 15,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  spacer: {
    height: 32,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    marginBottom: 10,
    marginTop: 10,
  },
  detailsContainer: {
    gap: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
    alignItems: 'center',
  },
  detailTextLeft: {
    fontSize: 15,
  },
  detailTextRight: {
    fontSize: 13,
    fontWeight: '600',
  },
  resultsSection: {
    marginTop: 24,
    marginBottom: 24,
    gap: 16,
  },
  resultCard: {
    borderRadius: 16,
    padding: 16,
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  resultCardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pitchTextContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  pitchText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  finalButtonContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
});
