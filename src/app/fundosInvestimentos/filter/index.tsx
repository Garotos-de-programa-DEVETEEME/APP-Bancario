import { FilterType } from "@/src/@Types/Filter";
import { FavoriteButton } from "@/src/components/Buttons/favoriteButton";
import { NavigationButton } from "@/src/components/Buttons/navigationButton";
import { FilterOption } from "@/src/components/SearchBar/filterOption";
import { useFilters } from "@/src/Context/filterContext";
import { useTheme } from "@/src/hooks/useTheme";
import { StylesType } from "@/src/themes/Colors";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function FilterFundsPage() {
    const {filters, setFilters} = useFilters();
    const theme = useTheme();
    const style = styles(theme);

    const [valueFilters, setValueFilters] = useState<FilterType[]>([//filtros por valor monetario
                    {
                        id:1,
                        value:'500',//adaptar para como funcionara na api
                        placeholder:'R$0 - R$500',
                        selected:false,
                    },
                    {
                        id:2,
                        value:'1000',
                        placeholder:'R$500 - R$1000',
                        selected:false,
                    },
                    {
                        id:3,
                        value:'1001',
                        placeholder:'+ R$1000',
                        selected:false,
                    },
                ]);
    const [riskFilters, setRiskFilters] = useState<FilterType[]>([//filtros por risco
                    {
                        id:4,
                        value:'muito baixo',
                        placeholder:'Muito Baixo',
                        color: theme.risk.veryLow,
                        selected: false,
                    },
                    {
                        id:5,
                        value:'baixo',
                        placeholder:'Baixo',
                        color: theme.risk.low,
                        selected: false,
                    },
                    {
                        id:6,
                        value:'medio',
                        placeholder:'Médio',
                        color: theme.risk.medium,
                        selected: false,
                    },
                    {
                        id:7,
                        value:'alto',
                        placeholder:'Alto',
                        color: theme.risk.high,
                        selected: false,
                    },
                ]);
    const [starFilter, setStarFilter] = useState<FilterType>({
                    id:8,
                    value:'favoritos',
                    placeholder:'Favoritos',
                    selected: false,
                    color:'#F2C94C',//cor do filtro de favoritos
                });

    useEffect(()=> {
            if(filters.length > 1){//atualiza os fltros com base no que foi selecionado anteriormente
                filters.forEach((e) => {
                    if(e.id === 1 || e.id === 2 || e.id === 3){//filtros de valor
                        setValueFilters(prev => prev.map(filter => filter.id === e.id? {...filter, selected: e.selected}: filter));
                    } else if(e.id >= 4 && e.id <= 7){//filtros de risco
                        setRiskFilters(prev => prev.map(filter => filter.id === e.id? {...filter, selected: e.selected}: filter));
                    } else if(e.id === 8){//filtro de favoritos
                        setStarFilter({...e});
                    }
                });
            }
        },[])

    const updateValueFilter = (id: number) => {// Atualiza o filtro de valor selecionado
        setValueFilters(prev => prev.map(filter =>//setta uma nova lista de filtros com base no valor retornado nesse map
            filter.id === id? {...filter, selected: !filter.selected}:{...filter, selected: false} //caso o filter seja p procurado(id iguais) mudamos o valor do seu selected caso n definimos como false
        ))
    }

    const updateRiskFilter = (id: number) => {// Atualiza o filtro de valor selecionado
        setRiskFilters(prev => prev.map(filter =>//setta uma nova lista de filtros com base no valor retornado nesse map
            filter.id === id? {...filter, selected: !filter.selected}:filter//caso o filter seja p procurado(id iguais) mudamos o valor do seu selected caso n definimos retornamos o filtro sem alterações
        ))
    }

    const updaterStarFilter = () =>{
        setStarFilter(prev => prev! && {...prev, selected: !prev.selected});// Atualiza o filtro de favoritos
    }

    const filterSelected = (list: FilterType[]) => {
        return list.filter((e) => !!e && e.selected === true);
    }

    const updateFilters = () => {
        // Use a local variable instead of state
        let selectedFilters: FilterType[] = [
            ...filterSelected(valueFilters),
            ...filterSelected(riskFilters)
        ];
        if (starFilter.selected) {
            selectedFilters = [...selectedFilters, starFilter];
        }
        console.log(selectedFilters);
        setFilters(selectedFilters);
        router.push('/fundosInvestimentos');
    }

    return(
        <View>
            <View style={style.starCategorie}>
                <Text style={style.categoriesTitle}>Favoritos</Text>
                <View style={style.starButton}>
                    <FavoriteButton onPress={() =>  updaterStarFilter()} selected={starFilter?.selected!} text={'Favoritos'} />
                </View>
            </View>
            <View>
                <Text style={style.categoriesTitle}>Aplicação Inicial</Text>
                <View style={style.categoriesCards}>
                    {valueFilters.map((e)=>
                        <FilterOption
                            key={e.id}
                            info={e}
                            isSelected={e.selected}
                            onSelect={(e) => updateValueFilter(e)}
                        />
                    )}
                </View>
            </View>
            <View>
                <Text style={style.categoriesTitle}>Risco</Text>
                <View style={style.categoriiesRiskCards}>
                    {riskFilters.map((e)=>
                        <FilterOption
                            key={e.id}
                            info={e}
                            isSelected={e.selected}
                            onSelect={(e) => updateRiskFilter(e)}
                            height={22}
                            width={94}
                            type='risk'
                        />
                    )}
                </View>
            </View>
            <View style={style.redirectButton}>
                <NavigationButton
                onPress={() => updateFilters()}
                text="Filtrar"
            />
            </View>
        </View>
    )
};

const styles = (theme:StylesType)=>{
    return StyleSheet.create({
        categoriesTitle:{
            color:theme.text,
            fontSize:18,
            fontWeight:'bold',
            marginBottom:16,
            marginLeft:22,
        },
        categoriesCards:{
            display:'flex',
            flexDirection:'row',
            gap:8,
            justifyContent:'center',
            width:'100%',
            borderBottomColor:theme.border,
            borderBottomWidth:1,
            paddingBottom:24,
            marginBottom:18,
        },
        starCategorie:{
            display:'flex',
            flexDirection:'column',
            justifyContent:'flex-start',
            borderBottomColor:theme.border,
            borderBottomWidth:1,
            paddingBottom:16,
            marginBottom:18,
        },
        starButton:{
            marginLeft:21
        },
        categoriiesRiskCards:{
            display:'flex',
            flexDirection:'row',
            gap:4,
            justifyContent:'center',
            width:'100%',
            borderBottomColor:theme.border,
            borderBottomWidth:1,
            paddingBottom:24,
            marginBottom:18,
        },
        redirectButton:{
            alignItems:'center'
        }
    });
}