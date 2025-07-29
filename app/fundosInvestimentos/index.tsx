import { FundsCard } from "@/components/fundsListing/fundCard";
import { stylesType } from "@/constants/Colors";
import { tempFundos } from "@/constants/Types/fundos";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";

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
            <View style={{backgroundColor:theme.backgroundCards, width: 400, height:33 ,borderRadius:10, alignSelf:'center', display:'flex', justifyContent:'center',marginTop:24,  }}>
                <View>
                    <Image src={require('../../assets/Images/pesquisar.png')} />
                    <Text style={{color:theme.alternativeIcon}}>Buscar Fundo</Text>
                </View>
                <Image/>
            </View>
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