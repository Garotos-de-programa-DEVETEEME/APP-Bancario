import { fundsType } from "@/src/@Types/fundos";
import { useTheme } from "@/src/hooks/useTheme";
import { stylesType } from "@/src/themes/Colors";
import { coinFormat } from "@/src/utils/coinFormat";
import { converterNumeroParaHora } from "@/src/utils/hourFormat";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
                    <Pressable style={styles.moreInfoButton}>
                        <Text style={styles.moreInfoButtonText}>
                            Saiba Mais
                        </Text>
                    </Pressable>
                    <Pressable style={styles.investirButton}>
                        <Text style={styles.investirButtonText}>
                            Investir
                        </Text>
                    </Pressable>
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
        moreInfoButton:{
            backgroundColor: theme.backgroundCards,
            borderRadius: 10,
            height: 29,
            width: 180,
            justifyContent:'center',
            alignItems:'center',
            marginTop: 16,
            marginBottom: 8,
            borderColor: theme.tint,
            borderWidth: 1,
        },
        moreInfoButtonText:{
            color: theme.tint,
            fontFamily: theme.fontFamily,
            fontSize: 15,
            fontWeight:'500',
        },
        investirButton:{
            backgroundColor: theme.tint,
            borderRadius: 10,
            height: 29,
            width: 180,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16,
            marginBottom: 8,
        },
        investirButtonText:{
            color: theme.whiteText,
            fontFamily: theme.fontFamily,
            fontSize: 15,
            fontWeight:'500',
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