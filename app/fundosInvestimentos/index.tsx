import { FundsCard } from "@/components/fundsListing/fundCard";
import { SearchBar } from "@/components/searchBar";
import { stylesType } from "@/constants/Colors";
import { tempFundos } from "@/constants/Types/fundos";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import { View, StyleSheet, } from "react-native";

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

    const [searchBarValue, setSearchBarValue] = useState('');

    const filterFundosInvestimentos = (text: string) => {
        setSearchBarValue(text);
    };

    return(
        <View style={styles.container}>
            <SearchBar
                placeholder="Buscar fundo"
                value={searchBarValue}
                onChangeText={(e) => filterFundosInvestimentos(e)}
                filter
            />

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