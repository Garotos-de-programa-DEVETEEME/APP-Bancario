import { stylesType } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { Text, StyleSheet, View } from "react-native";

interface riskIconProps{
    risk: 'muito baixo' | 'baixo' | 'medio' | 'alto';
}

export const RiskIcon = ({risk}: riskIconProps) =>{
    const theme = useTheme();
    const styles = getStyles(theme, risk);
    return(
        <>
            <Text style={styles.fundRiskText}>
                {`Risco ${risk === 'muito baixo'? 'Muito Baixo': risk === 'baixo'? 'Baixo': risk === 'medio'? 'Médio': 'Alto'}:`}
            </Text>
            <View style={styles.container}>
                <Text style={styles.firstIcon}></Text>
                <Text style={styles.secondIcon}></Text>
                <Text style={styles.thirdIcon}></Text>
                <Text style={styles.fourthIcon}></Text>
            </View>
        </>
    );
};

const getStyles = (theme: stylesType, risk: string) =>{
    const ballSize = 10

    return StyleSheet.create({
        container:{
            display:'flex',
            flexDirection:'row',
            gap: 1,
        },
        fundRiskText:{
            color: theme.alternativeIcon,
            fontSize:12,
            fontFamily:theme.fontFamily,
        },
        firstIcon:{
            backgroundColor: risk === 'muito baixo'? theme.risk.veryLow: risk === 'baixo'? theme.risk.low: risk === 'medio'? theme.risk.medium: theme.risk.high,
            width: ballSize,
            height: ballSize,
            borderRadius: ballSize/2,
        },
        secondIcon:{
            backgroundColor: risk === 'baixo'? theme.risk.low: risk === 'medio'? theme.risk.medium: risk === 'alto'? theme.risk.high: '',
            width: ballSize,
            height: ballSize,
            borderRadius: ballSize/2,
        },
        thirdIcon:{
            backgroundColor: risk === 'medio'? theme.risk.medium: risk === 'alto'? theme.risk.high: '',
            width: ballSize,
            height: ballSize,
            borderRadius: ballSize/2,
        },
        fourthIcon:{
            backgroundColor: risk === 'alto'? theme.risk.high: '',
            width: ballSize,
            height: ballSize,
            borderRadius: ballSize/2,
        },

    });
};