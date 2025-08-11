import { tempFunds } from "@/src/@Types/fundos";
import { FundsCard } from "@/src/components/fundsListing/fundCard";
import { SearchBar } from "@/src/components/SearchBar/searchBar";
import { useTheme } from "@/src/hooks/useTheme";
import { StylesType } from "@/src/themes/Colors";
import { useState } from "react";
import { StyleSheet, View, } from "react-native";

export default function FundoInvestimento() {
    const investmentFunds = tempFunds;
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

    return(
        <View style={styles.container}>
            <SearchBar
                placeholder="Buscar fundo"
                value={searchBarValue}
                onChangeText={(e) => setSearchBarValue(e)}
                filter
            />

            {investmentFunds.map((fund)=>{
                return(
                    <>
                        <FundsCard
                            fund={fund}
                            key={fund.codigo}
                            onPress={() => changeCurrentExpanded(fund.codigo)}
                            expanded={currentExpanded === fund.codigo}
                        />
                    </>
                );
            })}
        </View>
    );
};

const getStyles = (theme: StylesType) =>{
    return StyleSheet.create({
        container: {
            backgroundColor: theme.background,
            height:'100%',
            gap:20
        },
    });
};