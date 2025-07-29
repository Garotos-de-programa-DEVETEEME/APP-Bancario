import { stylesType } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { fundosType } from "@/constants/Types/fundos";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { RiskIcon } from "./riskIcon";
import { Expanded } from "./expandedFund";

interface FundsCardProps{
    fund:fundosType;
    onPress: () => void;
    expanded: boolean;
}

export const FundsCard = ({fund, onPress, expanded}: FundsCardProps) => {
    const coinFormat = (valor: number) => {
        const formatador = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });

        return formatador.format(valor);
    };

    const theme = useTheme();
    const styles = getStyle(theme, expanded);

    return(
        <View style={styles.container}>
            <Pressable onPress={onPress}>
                <View style={styles.textContainer}>
                    <Text style={styles.fundTypeText}>
                        {fund.type}
                    </Text>
                    <View style={styles.riskContainer}>
                        <Text style={styles.fundRiskText}>
                            {`Risco ${fund.risk}:`}
                        </Text>
                        <RiskIcon risk={fund.risk} />
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        {fund.name}
                    </Text>
                </View>
                <View></View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Aplicação incial: </Text>
                    <Text style={styles.text}>
                        {coinFormat(fund.initialApplication)}
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Rentabilidade dos ultimos 12 meses</Text>
                    <Text style={styles.rentabilityText}>
                        {`${fund.rentability}%`}
                    </Text>
                </View>
            </Pressable>
            <Expanded
                fund={fund}
                expanded={expanded}
            />
        </View>
    );
}
const getStyle = (theme: stylesType, expanded: boolean) =>{
    return StyleSheet.create({
        container: {
            backgroundColor: theme.backgroundCards,
            width:400 ,
            borderRadius: '15px',
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
        fundRiskText:{
            color: theme.alternativeIcon,
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