import { stylesType } from "@/constants/Colors";
import { fundosType } from "@/constants/Types/fundos";
import { useTheme } from "@/hooks/useTheme";
import { Text, View, Pressable,StyleSheet } from "react-native";

interface expandedProps{
    fund: fundosType;
    expanded:boolean
}

export const Expanded = ({fund, expanded}:expandedProps) =>{
    const theme = useTheme();
    const styles = getStyles(theme, expanded);

    const coinFormat = (valor: number) => {
        const formatador = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });

        return formatador.format(valor);
    };

    return (
        <View style={styles.expandedContentContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Taxa global: </Text>
                    <Text style={styles.text}> {`${fund.globalTax}% a.a.`} </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Hora limite de aplicação: </Text>
                    <Text style={styles.text}> {`${fund.limitTimer}:00`/* alterar para data*/} </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Movimentação (aplic/resg): </Text>
                    <Text style={styles.text}> {`${coinFormat(fund.movimentation)}`} </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Cotização de resgate: </Text>
                    <Text style={styles.text}> {`D+${fund.daysRescue} (Dias Corridos)`} </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Cotização de resgate: </Text>
                    <Text style={styles.text}> {`D+${fund.daysLiquidation} (Dias Úteis)`} </Text>
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
            backgroundColor: theme.text,
            borderRadius: 10,
            height: 29,
            width: 180,
            justifyContent:'center',
            alignItems:'center',
            marginTop: 16,
            marginBottom: 8,
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
            color: theme.text,
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