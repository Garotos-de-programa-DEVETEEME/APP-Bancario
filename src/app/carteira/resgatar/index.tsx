import { StylesType } from "@/src/@Types/stylesType";
import { NavigationButton } from "@/src/components/Buttons/navigationButton";
import { SwitchButton } from "@/src/components/Buttons/switch";
import PriceInput from "@/src/components/Input/priceInput";
import { StyledText } from "@/src/components/StyledText";
import { useTheme } from "@/src/hooks/useTheme";
import { coinFormat } from "@/src/utils/coinFormat";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function ResgatarPage() {
  const theme = useTheme();
  const styles = getStyles(theme);

  // Pegue os parâmetros da navegação
  const { saldo = 0, valorMinimoPermanencia = 0, valorMinimoResgate = 0 } = useLocalSearchParams();

  // Converta para número, pois vem como string
  const saldoNum = Number(saldo);
  const valorMinimoPermanenciaNum = Number(valorMinimoPermanencia);
  const valorMinimoResgateNum = Number(valorMinimoResgate);

  const [valorResgate, setValorResgate] = useState(0);
  const [resgatarTudo, setResgatarTudo] = useState(false);

  useEffect(() => {
    if (resgatarTudo) {
      setValorResgate(saldoNum*100);
    } else {
      setValorResgate(0);
    }
  }, [resgatarTudo, saldoNum]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <StyledText style={styles.title}>
          Qual <StyledText style={[styles.textBold, styles.title]}>Valor</StyledText> deseja resgatar?
        </StyledText>
        <PriceInput
          value={valorResgate}
          onValueChange={setValorResgate}
          placeholder={valorResgate}
          alternativeStyle={{...styles.input}}
        />
      </View>
      <View style={[styles.subtitleContainer, { marginBottom: 40 }]}>
        <StyledText style={{fontSize:20, color: theme.text}}>Resgatar valor total</StyledText>
        <SwitchButton value={resgatarTudo} onValueChange={setResgatarTudo}
        />
      </View>
      <View>
        <View style={[styles.subtitleContainer]}>
          <StyledText style={styles.subtitle}>Disponível para resgate</StyledText>
          <StyledText style={styles.subtitle}>{coinFormat(saldoNum)} </StyledText>
        </View>
        <View style={[styles.subtitleContainer]}>
          <StyledText style={styles.subtitle}>Saldo mínimo de permanência</StyledText>
          <StyledText style={styles.subtitle}> {coinFormat(valorMinimoPermanenciaNum)} </StyledText>
        </View>
        <View style={[styles.subtitleContainer]}>
          <StyledText style={styles.subtitle}>Valor mínimo de resgate</StyledText>
          <StyledText style={styles.subtitle}> {coinFormat(valorMinimoResgateNum)} </StyledText>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <View>
          <StyledText style={styles.subtitle}>O resgate desse fundo pode ser realizado até </StyledText>
          <StyledText style={{alignSelf:'center'}}>às <StyledText style={styles.textBold}>17:00 em dias úteis</StyledText></StyledText>
        </View>
        <NavigationButton onPress={() => router.push('/carteira') } text="Continuar" />
      </View>
    </View>
  );
}
const getStyles = (theme: StylesType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 16,
    },
    textContainer:{
      gap: 20,
      marginVertical: 44,
    },
    title: {
      fontSize: 24,
      color: theme.text,
    },
    textBold: {
      fontWeight: 'bold',
    },
    input:{
      backgroundColor: 'transparent',
      fontSize: 40,
      borderBottomColor:theme.tint,
      borderBottomWidth:1,
    },
    subtitleContainer:{
       display: 'flex', 
       flexDirection:'row', 
       alignItems:'center', 
       justifyContent:'space-between',
    },
    subtitle:{
      fontSize: 16,
      color: theme.text,
    },
    footerContainer:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      gap:32,
      marginTop:160
    }
  });
}