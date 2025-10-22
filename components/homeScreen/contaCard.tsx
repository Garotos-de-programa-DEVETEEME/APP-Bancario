import { StylesType } from "@/@Types/stylesType";
import { useTheme } from "@/hooks/useTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { StyledText } from "../StyledText";

interface ContaCardProps{
    numeroAgencia: number;
    numeroConta:string;
}

export const ContaCard = ({numeroAgencia,numeroConta}:ContaCardProps) => {

    const theme = useTheme();
    const styles = getStyles(theme);

    return(
        <View style={styles.container}>
            <View style={{marginLeft:12}}>
                <View style={styles.textRow}>
                    <StyledText style={styles.text}> agência </StyledText>
                    <StyledText style={[styles.text, {fontWeight:'bold'}]}> {numeroAgencia} </StyledText>
                </View>
                <View style={styles.textRow}>
                    <StyledText style={styles.text}> conta </StyledText>
                    <StyledText style={[styles.text, {fontWeight:'bold'}]}> {numeroConta} </StyledText>
                </View>
            </View>
            <View style={styles.iconsContainer}>
                <MaterialCommunityIcons name="content-copy" color={theme.tint} size={15}/>
                <MaterialCommunityIcons name="share-variant" color={theme.tint} size={16} onPress={()=>{}} />
            </View>
        </View>
    );
}

const getStyles = (theme:StylesType) => {
    return StyleSheet.create({
        container:{
            backgroundColor:theme.backgroundCards,
            borderColor: theme.border,
            borderWidth:1,
            width:'100%',
            height:64,
            borderRadius:5,
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
        },
        iconsContainer:{
            display:'flex',
            flexDirection:'row',
            gap:8,
            marginRight:12,
        },
        textRow:{
            display:'flex',
            flexDirection:'row',
            gap:4,
        },
        text:{
            color:theme.text,
            fontSize:14,
        }

    })
}
