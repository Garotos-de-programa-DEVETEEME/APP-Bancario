import { useTheme } from "@/hooks/useTheme";
import { View, StyleSheet,Image, ImageBackground } from "react-native";
import { StyledText } from "../StyledText";
import { StylesType } from "@/@Types/stylesType";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ClienteImageProps{
    name: string | string[];
    image: string;
}

export const ClientImage = ({name, image}:ClienteImageProps) => {

    const theme = useTheme();
    const style = getStyles(theme);

    return(
        <View>
            <ImageBackground source={require('../../assets/images/home/banestes-56-anos.png')} style={style.backgroundImage} imageStyle={{ borderRadius: 10 }}/>
            <View style={style.imageContainer}>
                <Image source={require('../../assets/images/home/banestes-home.jpg')} style={style.clientImage}/>
                <View style={style.editContainer}>
                    <MaterialCommunityIcons name="pencil" color={theme.icon} onPress={()=>{}} />
                </View>
                <StyledText style={style.title}> {name} </StyledText>
            </View>
        </View>
    );
}

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
        },
        editContainer:{
            backgroundColor:theme.backgroundCards,
            width:32, 
            height:32,
            borderRadius:32/2,
            justifyContent:'center',
            alignItems:'center',
            position:'absolute',
            bottom:'10%',
            right:'35%'
        }
    })
}