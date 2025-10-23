import { StylesType } from "@/@Types/stylesType";
import { BaseScreen } from "@/components/BaseScreen/BaseScreen";
import { ScreenStates } from "@/components/BaseScreen/ScreenStates";
import { SwitchButton } from "@/components/Buttons/switch";
import { ClientImage } from "@/components/PerfilCliente/clientImage";
import { ContaCard } from "@/components/PerfilCliente/contaCard";
import { StyledText } from "@/components/StyledText";
import { useTheme } from "@/hooks/useTheme";
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
    const [darkTheme, setDarkTheme] = useState<boolean>(false);

  useEffect(()=>{
    setDarkTheme(currentTheme == "dark");
  },[])

  // Sincronizar `darkTheme` com `currentTheme`
  useEffect(() => {
        changeTheme(darkTheme ?  "dark":"light");
  }, [currentTheme, darkTheme]);


  // Alterar o tema global quando `darkTheme` mudar
  useEffect(() => {
    }, [darkTheme, changeTheme]);

    return(
        BaseScreen({
            state: screenState,
            children: (
                <View style={style.container}>
                    <ClientImage name={'Juliana'} image={imageUri} />

                    <View style={style.contentContainer}>
                        <ContaCard numeroConta={'3980425-7'} numeroAgencia={83}/>
                    </View>
                    <View style={[style.contentContainer, { gap:10 }]}>
                        <StyledText style={{color:theme.text, fontSize:18}}>Minhas Configurações</StyledText>
                        <View style={style.switchRow}>
                            <StyledText style={{color:theme.text, fontSize:16}}>Modo Escuro</StyledText>
                            <SwitchButton value={darkTheme} onValueChange={setDarkTheme} />
                        </View>
                        <View style={style.switchRow}>
                            <StyledText style={{color:theme.text, fontSize:16}}>Alana mode</StyledText>
                            <SwitchButton value={false} onValueChange={()=>{}} />
                        </View>
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
          title:{
            color:theme.text,
            fontSize:18,
            fontWeight:'bold',
        },
    })
}