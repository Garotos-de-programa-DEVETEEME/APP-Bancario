import { useTheme } from "@/src/hooks/useTheme";
import { View, StyleSheet, Pressable } from "react-native";
import { StyledText } from "../StyledText";
import { FundoInvestimento } from "@/src/@Types/fundos";
import { StylesType } from "@/src/@Types/stylesType";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface HighlightFundProps {
    data: FundoInvestimento;
    iconName: { name: string; color: string};
}


export const HighlightFund = ({data, iconName}: HighlightFundProps) => { 
    const theme = useTheme();
    const styles = getStyles(theme);

  return (
    <Pressable onPress={() => {}}>{/*TODO redirecionar para a pagina de saiba mais ou investir do fundo */}
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <MaterialCommunityIcons  name={iconName.name} color={iconName.color} size={22}/>
                <View style={{maxWidth: 80}}>
                    <StyledText style={{fontSize: 9, color:theme.text}}> {data.nome} </StyledText>
                </View>
            </View>
            <View style={styles.footer}>
                <StyledText style={{fontSize:10, color: theme.text}}><StyledText style={{color: "#00914D"}}> +{data.taxaRentabilidade.toFixed(2)}% </StyledText> no mês</StyledText>
            </View>
        </View>
    </Pressable>
  );
};

const getStyles = (theme: StylesType) => {
  return StyleSheet.create({
    container: {
        height: 72,
        width: 118,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius:16,
    },
    titleContainer: {
        backgroundColor:theme.background,
        borderTopLeftRadius:16,
        borderTopRightRadius:16,
        justifyContent:'space-around',
        alignItems:'center',
        display:'flex',
        flexDirection:'row',
        height: 48,
        boxSizing:'border-box',
    },
    footer:{
        backgroundColor:theme.background, 
        height: 24, 
        borderBottomLeftRadius:16, 
        borderBottomRightRadius:16, 
        justifyContent:'center',
        borderTopWidth:0.5,
        borderTopColor:theme.border
    }
  });
};
