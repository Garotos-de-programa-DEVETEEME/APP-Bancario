import { StylesType } from "@/@Types/stylesType";
import { BaseScreen } from "@/components/BaseScreen/BaseScreen";
import { ScreenStates } from "@/components/BaseScreen/ScreenStates";
import { SwitchButton } from "@/components/Buttons/switch";
import { ClientImage } from "@/components/PerfilCliente/clientImage";
import { ContaCard } from "@/components/PerfilCliente/contaCard";
import { StyledText } from "@/components/StyledText";
import { useTheme } from "@/hooks/useTheme";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground, Appearance, useColorScheme } from "react-native";

export default function PerfilClientePage(){

    const [screenState, setScreenState] = useState(ScreenStates.loading())
    const { clientImage, name='Cliente', clientData } = useLocalSearchParams();
    const imageUri = typeof clientImage === 'string' ? clientImage : '';
    useEffect(() => {
        setScreenState(ScreenStates.content())
    }, []);

    const theme = useTheme();
    const style = getStyles(theme);

    const [ligthTheme, setLigthTheme] = useState<boolean>(useColorScheme() === 'dark');

    //TODO corrijir mudança de tema
    // useEffect(()=>{
    //     if(ligthTheme){
    //         Appearance.setColorScheme('dark');
    //     }
    //     Appearance.setColorScheme('light');
    // }, [ligthTheme])

    return(
        BaseScreen({
            state: screenState,
            children: (
                <View style={style.container}>
                    <ClientImage name={''} image={imageUri} />
                    <View style={style.contentContainer}>
                        <ContaCard numeroConta={'3980425-7'} numeroAgencia={83}/>
                    </View>
                    <View style={[style.contentContainer, { gap:10 }]}>
                        <StyledText style={{color:theme.text, fontSize:18}}>Minhas Configurações</StyledText>
                        <View style={style.switchRow}>
                            <StyledText style={{color:theme.text, fontSize:16}}>Modo Escuro</StyledText>
                            <SwitchButton value={ligthTheme} onValueChange={setLigthTheme} />
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
        }
    })
}