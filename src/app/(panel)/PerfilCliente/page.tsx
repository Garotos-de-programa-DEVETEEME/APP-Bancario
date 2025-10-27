import { StylesType } from "@/@Types/stylesType";
import { BaseScreen } from "@/components/BaseScreen/BaseScreen";
import { ScreenStates } from "@/components/BaseScreen/ScreenStates";
import { SwitchButton } from "@/components/Buttons/switch";
import { ClientImage } from "@/components/ClientProfile/clientImage";
import { ContaCard } from "@/components/ClientProfile/contaCard";
import { SwitchRow } from "@/components/ClientProfile/switchRow";
import { StyledText } from "@/components/StyledText";
import { useTheme } from "@/hooks/useTheme";
import { useAlanaContext } from "@/src/contexts/alanaContext";
import { useThemeContext } from "@/src/contexts/themeContext";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

export default function PerfilClientePage() {
  const [screenState, setScreenState] = useState(ScreenStates.loading());
  const { clientImage, name = "Cliente" } = useLocalSearchParams();
  const imageUri = typeof clientImage === "string" ? clientImage : "";

  useEffect(() => {
    setScreenState(ScreenStates.content());
  }, []);

  const theme = useTheme();
  const style = getStyles(theme);

  const { theme: currentTheme, changeTheme } = useThemeContext();
  const [themeSwitch, setThemeSwitch] = useState<boolean>(false);
  
  const { userProfile, changeUserProfile } = useAlanaContext();
  const [alanaSwitch, setAlanaSwitch] = useState<boolean>(false);

  useEffect(()=>{//sincroniza o switchTheme e alanaSwitch com suas definições no aplicativo
    setThemeSwitch(currentTheme == "dark");
    setAlanaSwitch(userProfile == "Alana");
  },[])

  useEffect(() => {
        changeTheme(themeSwitch ?  "dark":"light");
  }, [themeSwitch]);

  useEffect(() => {
        changeUserProfile(alanaSwitch ?  "Alana":"common");
        if(alanaSwitch){
            setThemeSwitch(false);
        }
  }, [alanaSwitch]);

    return(
        BaseScreen({
            state: screenState,
            children: (
                <View style={style.container}>
                    <ClientImage name={name} image={imageUri} />

                    <View style={style.contentContainer}>
                        <ContaCard numeroConta={'3980425-7'} numeroAgencia={83}/>
                    </View>
                    <View style={[style.contentContainer, { gap:10, marginTop:10 }]}>
                        <StyledText style={{color:theme.text, fontSize:18}}>Minhas Configurações</StyledText>
                        <SwitchRow title={"Modo Escuro"} iconName="dark-mode" switchValue={themeSwitch} setSwitch={setThemeSwitch} disabled={userProfile === "Alana"} />
                        <SwitchRow title={"Modo ALANA"} iconName={"assessment"} switchValue={alanaSwitch} setSwitch={setAlanaSwitch} iconSize={18}/>
                    </View>
                </View>
            )
        })
    );
};

const getStyles = (theme:StylesType) => {
    return StyleSheet.create({
        container:{
            display:'flex', 
            gap:10,
            marginTop:10,
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