import { fundsType } from "@/src/@Types/fundos";
import { useTheme } from "@/src/hooks/useTheme";
import { StylesType } from "@/src/themes/Colors";
import { coinFormat } from "@/src/utils/coinFormat";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Expanded } from "./expandedFund";
import { RiskIcon } from "./riskIcon";

interface FundsCardProps{
    fund:fundsType;
    onPress: () => void;
    expanded: boolean;
}

export const FundsCard = ({fund, onPress, expanded}: FundsCardProps) => {

    const theme = useTheme();
    const styles = getStyle(theme);

    return(
        <View style={styles.container}>
            <Pressable onPress={onPress}>
                <View style={styles.textContainer}>
                    <Text style={styles.fundTypeText}>
                        {/*fund.type*/}
                    </Text>
                    <View style={styles.riskContainer}>
                        <RiskIcon risk={'alto'/*fund.risk*/} />
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        {fund.nome}
                    </Text>
                </View>
                <View style={{display:expanded? 'flex':'none', borderTopColor:theme.border, borderTopWidth:1 }}></View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Aplicação incial: </Text>
                    <Text style={styles.text}>
                        {coinFormat(fund.valorAplicacaoInicial)}
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Rentabilidade dos ultimos 12 meses</Text>
                    <Text style={styles.rentabilityText}>
                        {`${fund.taxaRentabilidade}%`}{/* consultar se este valor esta em porcentagem */}
                    </Text>
                </View>
                <Expanded
                    fund={fund}
                    expanded={expanded}
                />
            </Pressable>
        </View>
    );
}
const getStyle = (theme: StylesType) =>{
    return StyleSheet.create({
        container: {
            backgroundColor: theme.backgroundCards,
            width:380 ,
            borderRadius: 15,
            borderColor: theme.border,
            borderWidth:1,
            boxSizing:'border-box',
            paddingTop: 4,
            paddingBottom: 2,
            paddingRight: 11,
            paddingLeft: 4,
            alignSelf:"center"
        },
        fundTypeText:{
            color: theme.tint,
            fontSize:12,
            fontFamily:theme.fontFamily,
        },
        textContainer:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between'
        },
        title:{
            color:theme.text,
            fontSize:17,
            fontFamily:theme.fontFamily,
        },
        text:{
            color:theme.alternativeText,
            fontSize:13,
            fontFamily:theme.fontFamily,
        },
        rentabilityText:{
            color: theme.tint,
            fontSize:17,
            fontFamily:theme.fontFamily,
        },
        riskContainer:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap:10,
        },
    });
}