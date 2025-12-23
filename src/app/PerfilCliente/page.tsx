import { StylesType } from "@/src/@Types/stylesType";
import { ClientImage } from "@/src/components/ClientProfile/clientImage";
import { ContaCard } from "@/src/components/ClientProfile/contaCard";
import { SwitchRow } from "@/src/components/ClientProfile/switchRow";
import { StyledText } from "@/src/components/StyledText";
import { useThemeContext } from "@/src/Context/themeContext";
import { useTheme } from "@/src/hooks/useTheme";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function PerfilClientePage() {

  const theme = useTheme();
  const style = getStyles(theme);

  const { theme: currentTheme, changeTheme } = useThemeContext();
  const [themeSwitch, setThemeSwitch] = useState<boolean>(false);

  useEffect(()=>{//sincroniza o switchTheme e alanaSwitch com suas definições no aplicativo
    setThemeSwitch(currentTheme == "dark");
  },[])

  useEffect(() => {
        changeTheme(themeSwitch ?  "dark":"light");
  }, [themeSwitch]);


    return(
            <View style={style.container}>
                <ClientImage name={"Cliente"} image={''} />{/*TODO adicionar logica de tratamento da imagem */}
                <View style={style.contentContainer}>
                    <ContaCard numeroConta={'3980425-7'} numeroAgencia={83}/>
                </View>
                <View style={[style.contentContainer, { gap:10, marginTop:10 }]}>
                    <StyledText style={{color:theme.text, fontSize:18}}>Minhas Configurações</StyledText>
                    <SwitchRow title={"Modo Escuro"} iconName="dark-mode" switchValue={themeSwitch} setSwitch={setThemeSwitch}/>
                </View>
            </View>
    )
};

const getStyles = (theme:StylesType) => {
    return StyleSheet.create({
        container:{
            flex:1,
            gap:10,
            paddingTop:10,
            backgroundColor:theme.background,
        },
        contentContainer:{
            width:'85%',
            alignSelf:'center',
        },
        switchRow:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            borderBottomColor:theme.border,
            borderBottomWidth:1,
            paddingBottom:12,
        },
        textSwitch:{
            display:'flex',
            flexDirection:'row',
            gap:8,
            alignItems:'center'
        },
        title:{
            color:theme.text,
            fontSize:18,
            fontWeight:'bold',
        },
    })
}