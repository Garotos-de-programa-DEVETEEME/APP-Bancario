import { FundoInvestimento } from '@/src/@Types/fundos';
import { StylesType } from '@/src/@Types/stylesType';
import { DataLess } from '@/src/components/Dataless';
import { StyledText } from '@/src/components/StyledText';
import { useTheme } from "@/src/hooks/useTheme";
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function SaibaMais() {
  const { fundData } = useLocalSearchParams();
   const fund: FundoInvestimento | null =
    typeof fundData === 'string' ? JSON.parse(fundData) : null;
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <>
      {fund !== null? (
        <ScrollView>
          <StyledText>{fund.nome}</StyledText>
          <View>
            {/* TODO componente grafico */}
          </View>
          <View>
            <View style={styles.textContainer}>
              <StyledText style={{color:theme.text, fontSize:16, fontWeight:'bold'}}>Saldo líquido</StyledText>
              <StyledText style={{color:theme.text, fontSize:15, fontWeight:'300'}}>{fund.valorSaldoMinimo}</StyledText>{/*TODO alterar para saldo liquido */}
            </View>
            <View style={styles.textContainer}>
              <StyledText style={{color:theme.text, fontSize:16, fontWeight:'bold'}}>Classificação de risco</StyledText>
              <StyledText style={{color:theme.text, fontSize:15, fontWeight:'300'}}> {'Muito Baixo'} </StyledText> {/*TODO alterar conforme API de risco */}
            </View>
            <View style={styles.textContainer}>
              <StyledText style={{color:theme.text, fontSize:16, fontWeight:'bold'}}>Classificação CVM</StyledText>
              <StyledText style={{color:theme.text, fontSize:15, fontWeight:'300'}}> {'Renda Fixa Simples'} </StyledText>{/*TODO altera conforme tipo do fundo */}
            </View>
            <View style={styles.textContainer}>
              <StyledText style={{color:theme.text, fontSize:16, fontWeight:'bold'}}>Subclasse CVM</StyledText>
              <StyledText style={{color:theme.text, fontSize:15, fontWeight:'300'}}> {'Renda Fixa Simples'} </StyledText>{/*TODO altera conforme tipo do fundo */}
            </View>
            <View style={styles.textContainer}>
              <StyledText style={{color:theme.text, fontSize:16, fontWeight:'bold'}}>Tipo ANBIMA</StyledText>
              <StyledText style={{color:theme.text, fontSize:15, fontWeight:'300'}}> {'Renda Fixa Simples'} </StyledText>{/*TODO altera conforme tipo do fundo */}
            </View>

          </View>
        </ScrollView>
      ):(
        <DataLess/>
      )}
    </>
  );
}

const getStyles = (theme: StylesType) => {
  return StyleSheet.create({
    scrollView: {
      backgroundColor: theme.background,
    },
    container: {
      flexGrow: 1,
      paddingHorizontal: 25,
      paddingVertical: 20,
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
    textContainer:{
      justifyContent:'space-between', 
      display:'flex', 
      flexDirection:'row'
    },
  });
};

