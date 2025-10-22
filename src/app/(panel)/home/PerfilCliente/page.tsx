import { StylesType } from "@/@Types/stylesType";
import { BaseScreen } from "@/components/BaseScreen/BaseScreen";
import { ScreenStates } from "@/components/BaseScreen/ScreenStates";
import { ContaCard } from "@/components/homeScreen/contaCard";
import { StyledText } from "@/components/StyledText";
import { useTheme } from "@/hooks/useTheme";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { View, Image, StyleSheet, ImageBackground } from "react-native";

export default function PerfilClientePage(){

    const [screenState, setScreenState] = useState(ScreenStates.loading())
    const { clientImage, name='Cliente', clientData } = useLocalSearchParams();
    const imageUri = typeof clientImage === 'string' ? clientImage : '';
    useEffect(() => {
        setScreenState(ScreenStates.content())
    }, []);

    const theme = useTheme();
    const style = getStyles(theme);

    return(
        BaseScreen({
            state: screenState,
            children: (
                <View style={{display:'flex', gap:15, marginTop:10}}>
                    <ImageBackground source={require('../../../../../assets/images/home/banestes-56-anos.png')} style={style.backgroundImage} imageStyle={{ borderRadius: 10, }}/>
                    <View style={style.imageContainer}>
                        <Image source={require('../../../../../assets/images/home/banestes-home.jpg')} style={style.clientImage}/>
                        <StyledText style={style.title}> {name} </StyledText>
                    </View>
                    <View style={{width:'85%', alignSelf:'center'}}>
                        <ContaCard numeroConta={'3980425-7'} numeroAgencia={83}/>
                    </View>
                    <View>
                        
                    </View>
                </View>
            )
        })
    );
};

const getStyles = (theme:StylesType) => {
    return StyleSheet.create({
        imageContainer:{
            width:'90%',
            height:210,
            justifyContent:'flex-end',
            alignItems:'center',
            alignSelf:'center',
        },
        backgroundImage:{
            width:'96%',
            height:160,
            position:'absolute',
            alignSelf:'flex-end',
        },
        clientImage:{
            borderRadius:100/2,
            width:100,
            height:100,
            borderColor:theme.background,
            borderWidth:2,
        },
        title:{
            color:theme.text,
            fontSize:18,
            fontWeight:'bold',

        }
    })
}