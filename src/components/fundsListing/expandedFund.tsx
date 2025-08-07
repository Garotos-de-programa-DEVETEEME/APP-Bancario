import { fundsType } from "@/src/@Types/fundos";
import { useTheme } from "@/src/hooks/useTheme";
import { StylesType } from "@/src/themes/Colors";
import { converterNumeroParaHora } from "@/src/utils/hourFormat";
import { StyleSheet, Text, View } from "react-native";
import { NavigationButton } from "../Buttons/navigationButton";

interface expandedProps{
    fund: fundsType;
    expanded:boolean
}

export const Expanded = ({fund, expanded}:expandedProps) =>{
    const theme = useTheme();
    const styles = getStyles(theme, expanded);

    return (
        <View style={styles.expandedContentContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Taxa global: </Text>
                    <Text style={styles.text}> {`${fund.taxaAdministracao}% a.a.`} </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Hora limite de aplicação: </Text>
                    <Text style={styles.text}> {`${converterNumeroParaHora(fund.horaLimite)}`}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Movimentação (aplic/resg): </Text>
                    <Text style={styles.text}>  {'R$ 1,00'/*`${coinFormat(fund.movimentation)}`*/}</Text>{/*adicionar movimentação */}
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Cotização de resgate: </Text>
                    <Text style={styles.text}> {`D+30 (Dias Corridos)`} </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Cotização de resgate: </Text>
                    <Text style={styles.text}> {`D+${fund.prazoConversaoResgate} (Dias Úteis)`} </Text>
                </View>
                <View style={styles.textContainer}>
                    <NavigationButton route={() => console.log('temporario')} text={"Saiba Mais"} transparentStyle/>
                    <NavigationButton route={() => console.log('temporario')} text={"Investir"}/>
                </View>
            </View>
    );
};

const getStyles = (theme: StylesType, expanded:boolean) =>{
    return StyleSheet.create({
        expandedContentContainer:{
            display: expanded? 'flex':'none',
            flexDirection:'column',
        },
        text:{
            color:theme.alternativeText,
            fontSize:13,
            fontFamily:theme.fontFamily,
        },
        textContainer:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between'
        },
    });
};