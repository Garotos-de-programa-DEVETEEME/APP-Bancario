import { StylesType } from "@/@Types/stylesType";
import { BaseScreen } from "@/components/BaseScreen/BaseScreen";
import { ScreenStates } from "@/components/BaseScreen/ScreenStates";
import { StyledText } from "@/components/StyledText";
import { useTheme } from "@/hooks/useTheme";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { View, Image, StyleSheet, ImageBackground } from "react-native";

export default function PerfilClientePage(){

    const [screenState, setScreenState] = useState(ScreenStates.loading())
    const { clientImage, name='Cliente' } = useLocalSearchParams();
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
                <View>
                    <ImageBackground source={require('../../../../../assets/images/home/banestes-56-anos.png')} style={style.backgroundImage} imageStyle={{ borderRadius: 10, }}/>
                    <View style={style.imageContainer}>
                        <Image source={require('../../../../../assets/images/home/banestes-home.jpg')} style={style.clientImage}/>
                        <StyledText style={style.text}> {name} </StyledText>
                    </View>
                    <View>
                        <StyledText style={{color:'#000'}}>olaaa</StyledText>
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
            borderColor:theme.text,
            borderWidth:1,
        },
        text:{
            color:theme.text,
            fontSize:16,
        }
    })
}