import { FundsCard } from "@/components/fundsListing/fundCard";
import { stylesType, Styles } from "@/constants/Colors";
import { tempFundos } from "@/constants/Types/fundos";
import { useTheme } from "@/hooks/useTheme";
import { View, StyleSheet } from "react-native";

export default function FundoInvestimento() {

    const investmentFunds = tempFundos;
    const theme = useTheme();
    const styles = getStyles(theme);

    return(
        <View style={styles.container}>
            {investmentFunds.map((fund)=>{
                return(
                    <>
                        <FundsCard fund={fund}/>
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