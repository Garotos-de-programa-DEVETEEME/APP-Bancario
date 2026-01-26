import { FundoInvestimento } from '@/src/@Types/fundos';
import { StylesType } from '@/src/@Types/stylesType';
import { DocumentButton } from '@/src/components/Buttons/DocumentButton';
import { DataLess } from '@/src/components/Dataless';
import { ExpandedText } from '@/src/components/InfoTexts/expandText';
import { FundClass } from '@/src/components/InfoTexts/fundClass';
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
    { left: 'Resgate mínimo', right: fundo.valorMinimoResgateInternet },
    { left: 'Saldo mínimo para permanência', right: fundo.valorSaldoMinimoPermanencia },
    { left: 'Tipo de cota', right: 'Abertura' },
    { left: 'Carência', right: 'n/a' },
    { left: 'Cota de aplicação', right: 'D+0' },
    { left: 'Cota de resgate', right: `D+${fundo.cotizacaoResgate}` },
    { left: 'Débito em conta corrente', right: `D+${fundo.cotizacaoResgate}` },
    { left: 'Crédito em conta corrente', right: `D+${fundo.cotizacaoResgate}` },
    { left: 'Taxa de gestão', right: `${fundo.taxaAdministracao}% a.a.` },
    { left: 'Taxa de distribuição', right:  `40% a.a. ` },
    { left: 'Taxa de performance', right:`${fundo.taxaAdministracao}% a.a.` },
    { left: 'Taxa de ingresso', right:`${fundo.taxaRentabilidade}% a.a.` },
    { left: 'Taxa de saída', right:`${fundo.taxaRentabilidade}% a.a.` },
    { left: 'Horário limite para aplicação e resgate', right:`${fundo.horaLimiteAplicacaoResgate}:00` },
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
              <FundClass fund={fundo}/>
          </View>
          <View style={{borderBottomColor: theme.border, borderBottomWidth: 1, marginBottom: 16 }}>
            <ExpandedText title='Condições Comerciais' expandedItens={fundInformation}/>
            <DocumentButton type={'row'} title='Principais Fatores de Risco do Fundo' documentoUri={''}/>
            <DocumentButton type={'row'} title='Tributação' documentoUri={''}/>
            <ExpandedText title='Documentos do fundo' expandedItens={[]}/>
            <ExpandedText title='Comunicado aos Cotistas' expandedItens={[]}/>
            <ExpandedText title='Avisos Importantes' expandedItens={[]}/>
          </View>
          <View style={{marginTop: 24, marginBottom:16, gap:8}}>
            <StyledText style={{fontSize: 32, fontWeight: '500', color:theme.text}}>Sobre o fundo</StyledText>
            <StyledText style={{fontSize: 14, fontWeight: '400', color:theme.text, marginBottom: 12}}>
              Este fundo de investimento é destinado a investidores, pessoas físicas ou jurídicas, interessados em aplicar recursos no mercado de renda fixa com uma estratégia voltada para acompanhar a taxa SELIC. O fundo tem como objetivo proporcionar valorização das cotas dos seus cotistas por meio de aplicações em ativos financeiros de baixo risco, sendo classificado como renda fixa simples.
            </StyledText>
            <StyledText style={{fontSize: 14, fontWeight: '400', color:theme.text}}>
              {/*TODO adicionar descrição */} 
            </StyledText>
          </View>
          <View style={{marginBottom:80, display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
            <DocumentButton title='Regulamento' type='default' documentoUri={''} />
            <DocumentButton title='Documentação' type='default' documentoUri={''} alternativeIcon />
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