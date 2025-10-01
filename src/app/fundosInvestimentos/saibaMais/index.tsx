import { FundoInvestimento } from '@/src/@Types/fundos';
import { StylesType } from '@/src/@Types/stylesType';
import { DataLess } from '@/src/components/Dataless';
import { ExpandedText } from '@/src/components/InfoTexts/expandText';
import { TextRow } from '@/src/components/InfoTexts/rowText';
import { StyledText } from '@/src/components/StyledText';
import { useTheme } from "@/src/hooks/useTheme";
import { coinFormat } from '@/src/utils/coinFormat';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function SaibaMais() {
  const { fundData } = useLocalSearchParams();
   const fundo: FundoInvestimento | null =
    typeof fundData === 'string' ? JSON.parse(fundData) : null;
  const theme = useTheme();
  const styles = getStyles(theme);

  const fundInformation = fundo !== null? [
    { left: 'Aplicação inicial', right: coinFormat(fundo.valorAplicacaoInicial) },
    { left: 'Investimento adicional mínimo', right: fundo.valorAplicacaoInicial },
    { left: 'Resgate mínimo', right: fundo.valorMinimoResgatavel },
    { left: 'Saldo mínimo para permanência', right: fundo.valorSaldoMinimo },
    { left: 'Tipo de cota', right: 'Abertura' },
    { left: 'Carência', rigth: fundo.dataCarenciaResgate },
    { left: 'Cota de aplicação', right: 'D+0' },
    { left: 'Cota de resgate', right: `D+${fundo.prazoConversaoResgate}` },
    { left: 'Débito em conta corrente', right: `D+${fundo.prazoConversaoResgate}` },
    { left: 'Crédito em conta corrente', right: `D+${fundo.fundoPrazoCreditoConta}` },
    { left: 'Taxa de gestão', right: `${fundo.taxaAdministracao}% a.a.` },
    { left: 'Taxa de distribuição', right:  `40% a.a. ` },
    { left: 'Taxa de performance', rigth:`${fundo.taxaRentabilidade}` },
    { left: 'Taxa de ingresso',  },
    { left: 'Taxa de saída', rigth:`${fundo.taxaRentabilidade}` },
    { left: 'Horário limite para aplicação e resgate', rigth:`${fundo.horaLimiteAplicacaoInternet}:00` },
  ]:[];
  return (
    <View style={styles.container}>
      {fundo !== null? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <StyledText style={{fontSize:28, fontWeight:'500', color:theme.text}}>{fundo.nome}</StyledText>
          <View style={{height:100}}>
            {/* TODO componente grafico */}
          </View>
          <View>
              <TextRow left={'Saldo líquido'} right={coinFormat(fundo.valorAplicacaoInicial)}  bold />
              <TextRow left={'Classificação de risco'} right={'Muito Baixo'}  bold />
              <TextRow left={'Classificação CVM'} right={'Renda Fixa Simples'}  bold />
              <TextRow left={'Subclassse CVM'} right={'Renda Fixa Simples'}  bold />
              <TextRow left={'Tipo ANBIMA'} right={'Renda Fixa Simples'}  bold />
          </View>
          <View style={{borderBottomColor: theme.border, borderBottomWidth: 1, marginBottom: 16 }}>
            <ExpandedText title='Condições Comerciais' expandedItens={fundInformation}/>
            <ExpandedText title='Documentos do fundo' expandedItens={[]}/>
            <ExpandedText title='Comunicado aos Cotistas' expandedItens={[]}/>
            <ExpandedText title='Avisos Importantes' expandedItens={[]}/>
          </View>
          <View style={{marginTop: 24, marginBottom: 12}}>
            <StyledText style={{fontSize: 32, fontWeight: 'bold', color:theme.text}}>Sobre o fundo</StyledText>
            <StyledText style={{fontSize: 32, fontWeight: 'bold', color:theme.text}}> {/*TODO adicionar descrição */} </StyledText>
          </View>
        </ScrollView>
      ):(
        <DataLess/>
      )}
    </View>
  );
}

const getStyles = (theme: StylesType) => {
  return StyleSheet.create({
    scrollView: {
      backgroundColor: theme.background,
    },
    container: {
      backgroundColor: theme.background,
      paddingHorizontal:24,
      paddingTop:16
    },
    containerError: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center'
    },
    errorText: {
      color: theme.text,
      fontSize: 16
    },
    buttonContainer: {
      marginTop: 40,
      paddingBottom: 20,
      alignItems: 'center',
      gap: 4,
    },
  });
};