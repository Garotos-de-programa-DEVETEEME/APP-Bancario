import { fundsType, tempFunds } from "@/src/@Types/fundos";
import { FundsCard } from "@/src/components/fundsListing/fundCard";
import { StyledText } from "@/src/components/StyledText";
import { useTheme } from "@/src/hooks/useTheme";
import { StylesType } from "@/src/themes/Colors";
import { router } from "expo-router";
import { useState } from "react";
import {
    StyleSheet,
    View
} from 'react-native';

export default function SimularInvestimento() {
    const theme = useTheme();
    const styles = getStyles(theme);
    const investmentFunds = tempFunds;

    const [currentExpanded, setCurrentExpanded] = useState(-1);

    const changeCurrentExpanded = (key:number) =>{
        if(key === currentExpanded){
            setCurrentExpanded(-1);
            return;
        }
        setCurrentExpanded(key);
    }

    const handleSimulatePress = (fund: fundsType) => {
        router.push({
            pathname: "/simularInvestimento/detalhesFundo",
            params: { fundData: JSON.stringify(fund) }
        });
    };

    return(
            <View style={styles.container}>
                <View style={styles.aviso}>
                    <StyledText style={styles.avisotext}>A simulação considera seu perfil de investidor previamente cadastrado, garantindo maior adequação às suas preferências e tolerância a risco.</StyledText>
                </View>

                <View>
                    <StyledText style={styles.fundstext}>
                        Fundos
                    </StyledText>
                    <View style={styles.fundsbox}>
                        {investmentFunds.map((fund)=>{
                            return(
                                <FundsCard
                                    fund={fund}
                                    key={fund.codigo}
                                    onPress={() => changeCurrentExpanded(fund.codigo)}
                                    expanded={currentExpanded === fund.codigo}
                                    expandedType="simular"
                                    onSimulate={() => handleSimulatePress(fund)}
                                />
                            );
                        })}
                    </View>
                </View>
                
            </View>
    );
};

const getStyles = (theme: StylesType) =>{
    return StyleSheet.create({
        container: {
            alignItems: 'center',
            height: '100%',
            backgroundColor: theme.background
        },
        aviso: {
            backgroundColor: theme.backgroundCards,
            width: 380,
            height: 75,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 45,
            marginTop: 20,
            paddingHorizontal: 20
        },
        avisotext: {
            fontSize: 12,
            fontStyle: 'italic',
            textAlign: 'center',
            verticalAlign: 'middle',
            color: theme.alternativeText
        },
        fundsbox: {
            gap: 20
        },
        fundstext: {
            marginBottom: 10,
            color: theme.textSecundary
        }
    });
};