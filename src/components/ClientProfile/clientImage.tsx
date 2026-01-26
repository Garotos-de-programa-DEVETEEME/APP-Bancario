import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { StyledText } from "../StyledText";
import { useTheme } from "@/src/hooks/useTheme";
import { StylesType } from "@/src/@Types/stylesType";

interface ClienteImageProps{
    name: string | null;
    image: string;
}

export const ClientImage = ({name, image}:ClienteImageProps) => {

    const theme = useTheme();
    const style = getStyles(theme);

    return(
        <View>
            <ImageBackground source={require('../../assets/Images/image-33.png')} style={style.backgroundImage} imageStyle={{ borderRadius: 10 }}/>
            <View style={style.imageContainer}>
                <Image source={require('../../assets/Images/User.jpg')} style={style.clientImage}/>
            </View>
            <StyledText style={style.title}> {name} </StyledText>
        </View>
    );
}

const getStyles = (theme:StylesType) => {
    return StyleSheet.create({
        backgroundImage:{
            width:'96%',
            height:160,
            position:'absolute',
            alignSelf:'flex-end',
        },
        imageContainer:{
            width:'90%',
            height:210,
            justifyContent:'flex-end',
            alignItems:'center',
            alignSelf:'center',
            bottom:'5%',
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
            maxWidth:250,
            alignSelf:'center',
            textAlign:'center',
        },
        editContainer:{
            backgroundColor:theme.backgroundCards,
            width:32, 
            height:32,
            borderRadius:32/2,
            justifyContent:'center',
            alignItems:'center',
            position:'absolute',
            bottom:'2%',
            right:'35%'
        }
    })
}