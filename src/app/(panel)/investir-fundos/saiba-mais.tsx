import { BaseScreen } from '@/components/BaseScreen/BaseScreen';
import { ScreenStates } from '@/components/BaseScreen/ScreenStates';
import { NavigationButton } from '@/components/buttons/navigationButton';
import { FundClass } from '@/components/info/fundClass';
import { FundDetails } from '@/components/info/fundDetails';
import { TextRow } from '@/components/info/rowText';
import { useTheme } from '@/hooks/useTheme';
import { FundoDetalhe } from '@/services/fundos.service';
import { coinFormat } from '@/utils/coinFormat';
import { navigateToInvestir, navigateToSimulacao } from '@/utils/navigation.utils';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function SaibaMais() {
  const { fundData } = useLocalSearchParams<{ fundData?: string }>();
  const theme = useTheme();
  const styles = getStyles(theme);

  const [fund, setFund] = useState<FundoDetalhe | null>(null);
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

  const otherDetails = fund ? [
    { label: 'Tipo de Fundo', right: fund.tipoFundo },
    { label: 'Fundo Simples', right: fund.fundoSimples === 'S' ? 'Sim' : 'Não' },
    { label: 'Permite Aplicação', right: fund.permiteAplicar ? 'Sim' : 'Não' },
    { label: 'Permite Resgate', right: fund.permiteResgate ? 'Sim' : 'Não' },
    { label: 'Saldo Mínimo Permanência', right: coinFormat(fund.valorSaldoMinimoPermanencia) },
  ] : [];

  return (
    <BaseScreen state={screenState}>
      <View style={[styles.baseContainer, { backgroundColor: theme.background }]}>
        {fund && (
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.marginFix}>
            <FundDetails fund={fund} />
            </View>
            
            <View>
              <FundClass fund={fund} />
            </View>

            <View>
              {otherDetails.map(item => (
                <TextRow
                  key={item.label}
                  left={item.label}
                  right={item.right}
                  bold={true}
                />
              ))}
            </View>

            <View style={styles.buttonContainer}>
              <NavigationButton
                text="Simular"
                onPress={() => navigateToSimulacao(fund)}
                transparentStyle
                width={175}
              />
              <NavigationButton
                text="Investir"
                onPress={() => navigateToInvestir(fund)}
                width={175}
              />
            </View>
            
          </ScrollView>
        )}
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
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  buttonContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  marginFix: {
    marginBottom: 0
  }
});