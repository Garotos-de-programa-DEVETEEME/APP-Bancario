import { tempFundos } from "@/src/@Types/fundos";
import { FundsCard } from "@/src/components/fundsListing/fundCard";
import { SearchBar } from "@/src/components/searchBar";
import { useTheme } from "@/src/hooks/useTheme";
import { stylesType } from "@/src/themes/Colors";
import { useState } from "react";
import { StyleSheet, View, } from "react-native";

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