import { FilterType } from "@/src/@Types/Filter";
import { FavoriteButton } from "@/src/components/Buttons/favoriteButton";
import { NavigationButton } from "@/src/components/Buttons/navigationButton";
import { FilterOption } from "@/src/components/SearchBar/filterOption";
import { useFilters } from "@/src/Context/filterContext";
import { useTheme } from "@/src/hooks/useTheme";
import { stylesType } from "@/src/themes/Colors";
import { CommonActions } from "@react-navigation/native";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";


export default function FilterFundsPage() {
    const {filters, setFilters} = useFilters();
    const theme = useTheme();
    const style = styles(theme);


    const [selectedValueFilter, setSelectedValueFilter]= useState<number>(filters[0]?.id ?? -1);//pega o id do primeiro filtro selecionado, que é o de valor monetário

    const valueFilters: FilterType[] = [//filtros por valor monetario
        {
            id:1,
            value:'500',//adaptar para como funcionara na api
            placeholder:'R$0 - R$500',
        },
        {
            id:2,
            value:'1000',
            placeholder:'R$500 - R$1000',
        },
        {
            id:3,
            value:'1001',
            placeholder:'+ R$1000',
        },
    ]

    const [risksSelected, setRiskSelected]= useState<number[]>([]);

    for(var i = 2; i < filters.length; i++){
        setRiskSelected((prev) => [...prev, filters[i].id])
    }

    const riskFilters: FilterType[] = [//filtros por risco
        {
            id:4,
            value:'muito baixo',
            placeholder:'Muito Baixo',
            color: theme.risk.veryLow
        },
        {
            id:5,
            value:'baixo',
            placeholder:'Baixo',
            color: theme.risk.low
        },
        {
            id:6,
            value:'medio',
            placeholder:'Médio',
            color: theme.risk.medium,
        },
        {
            id:7,
            value:'alto',
            placeholder:'Alto',
            color: theme.risk.high
        },
    ]

    const [starSelected, setStarSelected] = useState(false);
    const starFilterValue:FilterType = {
        id:7,
        value: 'favorite',
        placeholder: 'Favoritos',
        color: '#DF9F1C'
    }


    const updateRiskFilter = (data: number) => {
        const includes = risksSelected.includes(data);
        if(includes){
            const newFilter = risksSelected.filter((item)=> item !== data)
            setRiskSelected(newFilter);
        }else{
            setRiskSelected(prev => [...prev, data])
        }
        console.log(risksSelected)
    }

    const updateValueFilter = (id: number) => {
        if(id === selectedValueFilter){ // Verifica se o filtro de valor selecionado é diferente do atual
            setSelectedValueFilter(-1); // Se o filtro de valor selecionado for o mesmo, desmarca
            return;
        }
       setSelectedValueFilter(id); // Atualiza o filtro de valor selecionado
    }

    const updateFilters = () =>{// Função para atualizar os filtros selecionados e sair da página de filtro
        const filtersToUpdate: FilterType[] = [];//array que vai receber os filtros selecionados
        if(selectedValueFilter > 0) filtersToUpdate[0] = (valueFilters[selectedValueFilter -1]);// se houver um filtro de valor selecionado, adiciona ao array
        if(starSelected) filtersToUpdate[1] = starFilterValue;

        var i = 2
        setFilters(filtersToUpdate);
        router.push('/fundosInvestimentos');
    }

    return(
        <View>
            <View style={style.starCategorie}>
                <Text style={style.categoriesTitle}>Favoritos</Text>
                <View style={style.starButton}>
                    <FavoriteButton onPress={() =>  setStarSelected(selected => !selected)} selected={starSelected} text={'Favoritos'} />
                </View>
            </View>
            <View>
                <Text style={style.categoriesTitle}>Aplicação Inicial</Text>
                <View style={style.categoriesCards}>
                    {valueFilters.map((e)=>
                        <FilterOption
                            key={e.id}
                            info={e}
                            isSelected={selectedValueFilter === e.id}
                            onSelect={(e) => updateValueFilter}
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
                            isSelected={risksSelected.includes(e.id)}
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