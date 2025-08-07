import { FilterType } from "@/src/@Types/Filter";
import { useTheme } from "@/src/hooks/useTheme";
import { StylesType } from "@/src/themes/Colors";
import { View, Text, StyleSheet } from "react-native";

interface filterSelectedProps{
    data:FilterType;

}


export const FiltersSelected = ({data}:filterSelectedProps)=>{

    const theme = useTheme();
    const style = getStyle(theme, data);

    return(
        <View style={style.container}>
            <Text style={style.text}>
                {data.placeholder}
            </Text>
        </View>
    );
}

function getStyle(theme:StylesType, data:FilterType){
    return(
        StyleSheet.create({
            container:{
                backgroundColor: data.color? data.color:theme.tint
            },
            text:{
                color: data.color? theme.text:theme.whiteText,
                fontFamily: theme.fontFamily,
                fontWeight: 500,
                fontSize: 14,
            }
        })
    );
}