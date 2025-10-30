import { BaseScreen } from '@/components/BaseScreen/BaseScreen';
import { ScreenStates } from '@/components/BaseScreen/ScreenStates';
import { NavigationButton } from '@/components/buttons/navigationButton';
import { AcceptanceTerm } from '@/components/info/acceptanceTerm';
import { FundClass } from '@/components/info/fundClass';
import { FundDetails } from '@/components/info/fundDetails';
import DropdownInput from '@/components/input/dropdownInput';
import PriceInput from '@/components/input/priceInput';
import { useTheme } from '@/hooks/useTheme';
import { FundoDetalhe } from '@/services/fundos.service';
import { SimulacaoResponse, simularFundo } from '@/services/provisorio-simular-fundo.service';
import { coinFormat } from '@/utils/coinFormat';
import { useLocalSearchParams } from 'expo-router';
import React, { FC, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

interface SimulationFormProps {
  fund: FundoDetalhe;
  onSimulate: () => void;
}

const SimulationForm: FC<SimulationFormProps> = ({ fund, onSimulate }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [valorSalvoDropdown, setValorSalvoDropdown] = useState('');
  const [valorAplicarEmCentavos, setValorAplicarEmCentavos] = useState(0);
  const [isButtonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    setButtonEnabled(valorAplicarEmCentavos >= fund.valorAplicacaoInicial * 100 && valorSalvoDropdown !== '');
  }, [valorSalvoDropdown, valorAplicarEmCentavos, fund]);

  return (
    <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
      <View style={styles.contentContainer}>
        <FundDetails fund={fund} />

        <View style={styles.sectionSpacer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Aplicação inicial</Text>
          <PriceInput
            value={valorAplicarEmCentavos}
            onValueChange={setValorAplicarEmCentavos}
            placeholder={fund.valorAplicacaoInicial * 100}
          />
        </View>

        <View style={styles.sectionSpacer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Data</Text>
          <DropdownInput
            content={['1 mês', '3 meses', '6 meses', '1 ano', '3 anos', '5 anos']}
            placeholder="Tempo estimado"
            onValueChange={setValorSalvoDropdown}
          />
        </View>

        <View style={styles.sectionSpacer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Classificação
          </Text>
          <FundClass fund={fund} />
        </View>

        <View style={[styles.buttonContainer, styles.sectionSpacer]}>
          <NavigationButton
            onPress={onSimulate}
            text="Simular"
            width={261}
            height={37}
            disabled={!isButtonEnabled}
          />
        </View>
        <View style={styles.spacer} />
      </View>
    </ScrollView>
  );
};

interface SimulationResultProps {
  fund: FundoDetalhe;
  result: SimulacaoResponse;
}

const SimulationResult: FC<SimulationResultProps> = ({ fund, result }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainerResult}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>{fund.nome}</Text>
        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        {/* Detalhes do Fundo */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailTextLeft, { color: theme.text }]}>Aplicação Inicial (Fundo):</Text>
            <Text style={[styles.detailTextRight, { color: theme.text }]}>{coinFormat(fund.valorAplicacaoInicial)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailTextLeft, { color: theme.text }]}>Taxa de Administração:</Text>
            <Text style={[styles.detailTextRight, { color: theme.text }]}>{fund.taxaAdministracao}% a.a.</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailTextLeft, { color: theme.text }]}>Hora limite da aplicação:</Text>
            <Text style={[styles.detailTextRight, { color: theme.text }]}>{fund.horaLimiteAplicacaoResgate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailTextLeft, { color: theme.text }]}>Movimentação (Aplic/Resg):</Text>
            <Text style={[styles.detailTextRight, { color: theme.text }]}>{`${coinFormat(fund.valorMinimoAplicacaoInternet)} / ${coinFormat(fund.valorMinimoResgateInternet)}`}</Text>
          </View>
        </View>

        {/* Resultados da Simulação */}
        <View style={styles.resultsSection}>
          <View style={[styles.resultCard, { backgroundColor: theme.backgroundCards }]}>
            <Text style={[styles.resultCardTextLeft, { color: theme.text }]}>Aplicação simulada</Text>
            <Text style={[styles.resultCardTextRight, { color: theme.text }]}>{coinFormat(result.valorSimulacaoAplicacaoInicial)}</Text>
          </View>
          <View style={[styles.resultCard, { backgroundColor: theme.backgroundCards }]}>
            <Text style={[styles.resultCardTextLeft, { color: theme.text }]}>Resgate estimado</Text>
            <Text style={[styles.resultCardTextRight, { color: theme.text }]}>{coinFormat(result.valorSimulacaoRetornoFinal)}</Text>
          </View>
          <View style={[styles.resultCard, { backgroundColor: theme.backgroundCards }]}>
            <Text style={[styles.resultCardTextLeft, { color: theme.text }]}>Taxa Estimada (Período)</Text>
            <Text style={[styles.resultCardTextRight, { color: theme.text }]}>{result.taxaSimulacaoEstimado}%</Text>
          </View>
        </View>

        {/* Botão Final */}
        <View style={styles.pitchTextContainer}>
          <Text style={[styles.pitchText, { color: theme.textSecundary }]}>Deseja utilizar esses valores para um investimento real?</Text>
        </View>
        <View style={styles.finalButtonContainer}>
          <NavigationButton onPress={() => console.log('Pressionado')} text="Aplicar Investimento" width={261} height={37} />
        </View>
        <View style={styles.spacer} />
      </View>
    </ScrollView>
  );
};

const SimulationLoading = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={theme.text} />
      <Text style={{ color: theme.text, marginTop: 10 }}>Simulando...</Text>
    </View>
  );
};

export default function DetalhesInvestimento() {
  const { fundData } = useLocalSearchParams<{ fundData?: string }>();
  const theme = useTheme();
  const styles = getStyles(theme);
  const modalizeRef = useRef<Modalize>(null);
  
  const [isChecked, setIsChecked] = useState(false);
  const [viewState, setViewState] = useState<'form' | 'loading' | 'result'>('form');
  
  const [fund, setFund] = useState<FundoDetalhe | null>(null);
  const [simulacaoResultado, setSimulacaoResultado] = useState<SimulacaoResponse | null>(null);
  const [screenState, setScreenState] = useState(ScreenStates.loading());

  useEffect(() => {
    if (!fundData) {
      setScreenState(ScreenStates.error("Dados do fundo não encontrados na navegação."));
      return;
    }
    try {
      const parsedFund: FundoDetalhe = JSON.parse(fundData as string);
      setFund(parsedFund);
      setScreenState(ScreenStates.content());
    } catch (error) {
      console.error("Erro ao parsear dados do fundo:", error);
      setScreenState(ScreenStates.error("Não foi possível carregar os dados do fundo."));
    }
  }, [fundData]);

  const onOpenTermo = () => modalizeRef.current?.open();

  const handleShowResults = async () => {
    modalizeRef.current?.close();
    setViewState('loading');
    try {
      const data = await simularFundo();
      setSimulacaoResultado(data);
      setViewState('result');
    } catch (error) {
      console.error("Erro ao simular fundo:", error);
      setViewState('form');
    }
  };

  const renderContent = () => {
    if (!fund) return null;
    switch (viewState) {
      case 'loading':
        return <SimulationLoading />;
      case 'result':
        return simulacaoResultado ? <SimulationResult fund={fund} result={simulacaoResultado} /> : null;
      case 'form':
      default:
        return <SimulationForm fund={fund} onSimulate={onOpenTermo} />;
    }
  };

  return (
    <BaseScreen state={screenState}>
      <View style={[styles.baseContainer, { backgroundColor: theme.background }]}>
        {renderContent()}
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
      </View>
    </BaseScreen>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  baseContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
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
  sectionSpacer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    color: theme.text,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  spacer: {
    height: 32,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
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
    alignItems: 'baseline',
  },
  detailTextLeft: {
    fontSize: 15,
    flex: 1,
    marginRight: 8,
  },
  detailTextRight: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
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
  resultCardTextLeft: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  resultCardTextRight: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
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