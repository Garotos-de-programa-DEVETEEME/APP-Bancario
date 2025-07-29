import { FundsCard } from "@/components/fundsListing/fundCard";
import { stylesType, Styles } from "@/constants/Colors";
import { tempFundos } from "@/constants/Types/fundos";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import { View, StyleSheet } from "react-native";

export default function FundoInvestimento() {

    const investmentFunds = tempFundos;
    const theme = useTheme();
    const styles = getStyles(theme);

    const [currentExpanded, setCurrentExpanded] = useState(-1);

    const changeCurrentExpanded = (key:number) =>{
        if(key === currentExpanded){
            setCurrentExpanded(-1);
            return;
        }
        setCurrentExpanded(key);
    }

    return(
        <View style={styles.container}>
            {investmentFunds.map((fund)=>{
                return(
                    <>
                        <FundsCard
                            fund={fund}
                            key={fund.id}
                            onPress={() => changeCurrentExpanded(fund.id)}
                            expanded={currentExpanded === fund.id}
                        />
                    </>
                );
            })}
        </View>
    );
};

const getStyles = (theme: stylesType) =>{
    return StyleSheet.create({
        container: {
            backgroundColor: theme.background,
            height:'100%',
            gap:'20px'
        },
    });
};