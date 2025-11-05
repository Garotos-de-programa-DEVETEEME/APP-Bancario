import { BaseScreen } from '@/components/BaseScreen/BaseScreen';
import { ScreenStates } from '@/components/BaseScreen/ScreenStates';
import { NavigationButton } from '@/components/buttons/navigationButton';
import { FundClass } from '@/components/info/fundClass';
import { FundDetails } from '@/components/info/fundDetails';
import DateInput from '@/components/input/dateInput';
import PriceInput from '@/components/input/priceInput';
import { useTheme } from '@/hooks/useTheme';
import { FundoDetalhe } from '@/services/fundos.service';
import { coinFormat } from '@/utils/coinFormat';
import { useLocalSearchParams } from 'expo-router';
import React, { FC, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface InvestmentFormProps {
  fund: FundoDetalhe;
  onInvest: (valor: number, data: string) => void;
}

const InvestmentForm: FC<InvestmentFormProps> = ({ fund, onInvest }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const [valorAplicarEmCentavos, setValorAplicarEmCentavos] = useState(0);
  const [applicationDate, setApplicationDate] = useState('');   
  const [isButtonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    const isValuePositive = valorAplicarEmCentavos > 0;
    const meetsMinimum = valorAplicarEmCentavos >= fund.valorAplicacaoInicial * 100;
    const isDateValid = applicationDate.length === 10; 
    
    setButtonEnabled(isValuePositive && meetsMinimum && isDateValid);
  }, [valorAplicarEmCentavos, applicationDate, fund]);

  const handlePressInvestir = () => {
    onInvest(valorAplicarEmCentavos, applicationDate);
  };

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
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Data da Aplicação</Text>
          <DateInput
              value={applicationDate}
              onValueChange={setApplicationDate}
              placeholder="DD/MM/AAAA"
          />
        </View>

        <View style={styles.sectionSpacerLarge}>
          <FundClass fund={fund} />
        </View>

        <View style={[styles.buttonContainer, styles.sectionSpacer]}>
          <NavigationButton
            onPress={handlePressInvestir}
            text="Investir"
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

interface InvestmentResultProps {
  fund: FundoDetalhe;
  valorAplicado: number;
  dataAplicacao: string;
}

const InvestmentResult: FC<InvestmentResultProps> = ({ fund, valorAplicado, dataAplicacao }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <FundDetails fund={fund} />
        
        <View style={styles.resultsSection}>
          <Text style={[styles.sectionTitle, { color: theme.text, marginBottom: 16 }]}>
            Comprovante de Aplicação
          </Text>
          
          <View style={[styles.resultCard, { backgroundColor: theme.backgroundCards }]}>
            <Text style={[styles.resultCardTextLeft, { color: theme.text }]}>Aplicação inicial</Text>
            <Text style={[styles.resultCardTextRight, { color: theme.text }]}>
              {coinFormat(valorAplicado / 100)}
            </Text>
          </View>

          <View style={[styles.resultCard, { backgroundColor: theme.backgroundCards }]}>
            <Text style={[styles.resultCardTextLeft, { color: theme.text }]}>Data de aplicação</Text>
            <Text style={[styles.resultCardTextRight, { color: theme.text }]}>
              {dataAplicacao}
            </Text>
          </View>
        </View>

        <View style={styles.finalButtonContainer}>
          <NavigationButton 
            onPress={() => console.log('Gerar Comprovante')} 
            text="Gerar Comprovante" 
            width={261} 
            height={37} 
          />
        </View>
      </View>
    </ScrollView>
  );
};


export default function InvestirFundo() {
  const { fundData } = useLocalSearchParams<{ fundData?: string }>();
  const theme = useTheme();
  const styles = getStyles(theme);

  const [fund, setFund] = useState<FundoDetalhe | null>(null);
  const [screenState, setScreenState] = useState(ScreenStates.loading());
  const [viewState, setViewState] = useState<'form' | 'result'>('form');

  const [valorInvestido, setValorInvestido] = useState(0);
  const [dataInvestimento, setDataInvestimento] = useState('');

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

  const handleInvestir = (valor: number, data: string) => {
    setValorInvestido(valor);
    setDataInvestimento(data);
    setViewState('result');
  };

  const renderContent = () => {
    if (!fund) return null; 

    switch (viewState) {
      case 'result':
        return (
          <InvestmentResult 
            fund={fund} 
            valorAplicado={valorInvestido} 
            dataAplicacao={dataInvestimento} 
          />
        );
      case 'form':
      default:
        return (
          <InvestmentForm 
            fund={fund} 
            onInvest={handleInvestir} 
          />
        );
    }
  };

  return (
    <BaseScreen state={screenState}>
      <View style={[styles.baseContainer, { backgroundColor: theme.background }]}>
        {renderContent()}
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 25,
    paddingBottom: 25,
  },
  sectionSpacer: {
    marginTop: 24,
  },
  sectionSpacerLarge: {
    marginTop: 32,
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
    backgroundColor: theme.backgroundCards,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  resultCardTextLeft: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  resultCardTextRight: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  finalButtonContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
});