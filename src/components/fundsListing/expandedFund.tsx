import { fundsType } from "@/src/@Types/fundos";
import { useTheme } from "@/src/hooks/useTheme";
import { stylesType } from "@/src/themes/Colors";
import { converterNumeroParaHora } from "@/src/utils/hourFormat";
import { StyleSheet, View } from "react-native";
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
                    <StyledText style={styles.text}>Taxa global: </StyledText>
                    <StyledText style={styles.text}> {`${fund.taxaAdministracao}% a.a.`} </StyledText>
                </View>
                <View style={styles.textContainer}>
                    <StyledText style={styles.text}>Hora limite de aplicação: </StyledText>
                    <StyledText style={styles.text}> {`${converterNumeroParaHora(fund.horaLimite)}`}</StyledText>
                </View>
                <View style={styles.textContainer}>
                    <StyledText style={styles.text}>Movimentação (aplic/resg): </StyledText>
                    <StyledText style={styles.text}>  {'R$ 1,00'/*`${coinFormat(fund.movimentation)}`*/}</StyledText>{/*adicionar movimentação */}
                </View>
                <View style={styles.textContainer}>
                    <StyledText style={styles.text}>Cotização de resgate: </StyledText>
                    <StyledText style={styles.text}> {`D+30 (Dias Corridos)`} </StyledText>
                </View>
                <View style={styles.textContainer}>
                    <StyledText style={styles.text}>Cotização de resgate: </StyledText>
                    <StyledText style={styles.text}> {`D+${fund.prazoConversaoResgate} (Dias Úteis)`} </StyledText>
                </View>
                <View style={styles.textContainer}>
                    <NavigationButton route={() => console.log('temporario')} text={"Saiba Mais"} transparentStyle/>
                    <NavigationButton route={() => console.log('temporario')} text={"Investir"}/>
                </View>
            </View>
    );
};

const getStyles = (theme: stylesType, expanded:boolean) =>{
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