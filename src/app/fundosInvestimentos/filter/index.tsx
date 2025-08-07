import { FilterType } from "@/src/@Types/Filter";
import { FavoriteButton } from "@/src/components/Buttons/favoriteButton";
import { NavigationButton } from "@/src/components/Buttons/navigationButton";
import { FilterOption } from "@/src/components/SearchBar/filterOption";
import { useFilters } from "@/src/Context/filterContext";
import { useTheme } from "@/src/hooks/useTheme";
import { stylesType } from "@/src/themes/Colors";
import { CommonActions } from "@react-navigation/native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";


export default function FilterFundsPage() {
    const {filters, setFilters} = useFilters();
    const theme = useTheme();
    const style = styles(theme);

    const initialValueFilters: FilterType[] = [//filtros por valor monetario
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
    ]

    const [valueFilters, setValueFilters] = useState<FilterType[]>(initialValueFilters);

    const updateValueFilter = (id: number) => {// Atualiza o filtro de valor selecionado
        setValueFilters(prev => prev.map(filter =>//setta uma nova lista de filtros com base no valor retornado nesse map
            filter.id === id? {...filter, selected: !filter.selected}:{...filter, selected: false} //caso o filter seja p procurado(id iguais) mudamos o valor do seu selected caso n definimos como false
        ))
        console.log(valueFilters)
    }


    const initialRiskFilters: FilterType[] = [//filtros por risco
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
    ]

    const [riskFilters, setRiskFilters] = useState<FilterType[]>(initialRiskFilters);


    const updateRiskFilter = (id: number) => {// Atualiza o filtro de valor selecionado
        setRiskFilters(prev => prev.map(filter =>//setta uma nova lista de filtros com base no valor retornado nesse map
            filter.id === id? {...filter, selected: !filter.selected}:filter//caso o filter seja p procurado(id iguais) mudamos o valor do seu selected caso n definimos retornamos o filtro sem alterações
        ))
    }


    const starFilterValue:FilterType = {
        id:7,
        value: 'favorite',
        placeholder: 'Favoritos',
        color: '#DF9F1C',
        selected: false,
    }

    const [starSelected, setStarSelected] = useState<boolean>(starFilterValue.selected);

    const updaterStarFilter = () =>{
        const isSelected = !starSelected
        setStarSelected(isSelected);
        starFilterValue.selected = isSelected;
    }

    const updateFilters = () =>{// Função para atualizar os filtros selecionados e sair da página de filtro
        const filtersToUpdate: FilterType[] = [starFilterValue,...riskFilters, ...valueFilters];//array que vai receber os filtros selecionados
        console.log(filtersToUpdate)
        router.push('/fundosInvestimentos');
    }

    return(
        <View>
            <View style={style.starCategorie}>
                <Text style={style.categoriesTitle}>Favoritos</Text>
                <View style={style.starButton}>
                    <FavoriteButton onPress={() =>  updaterStarFilter()} selected={starSelected} text={'Favoritos'} />
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
                <NavigationButton route={()=> updateFilters()} text={"Filtrar"}/>
            </View>
        </View>
    )
};

const styles = (theme:stylesType)=>{
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
            gap:24,
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