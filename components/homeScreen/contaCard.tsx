import { StylesType } from "@/@Types/stylesType";
import { useTheme } from "@/hooks/useTheme";
import { View, StyleSheet } from "react-native";

interface ContaCardProps{
    numeroConta: number;
}

const ContaCard = () => {

    const theme = useTheme();
    const styles = getStyles(theme);

    return(
        <View style={{backgroundColor:''}}>
            
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
    })
}
