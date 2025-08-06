import { FilterType } from "@/src/@Types/Filter";
import { NavigationButton } from "@/src/components/Buttons/navigationButton";
import { FilterOption } from "@/src/components/SearchBar/filterOption";
import { useFilters } from "@/src/Context/filterContext";
import { useTheme } from "@/src/hooks/useTheme";
import { stylesType } from "@/src/themes/Colors";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

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

    const [selectedRiskFilter, setSelectedRiskFilter] = useState<number>(filters[1]?.id ?? -1); //pega o id do segundo filtro selecionado, que é o de risco

    const riskFilters: FilterType[] = [//filtros por risco
        {
            id:4,
            value:'muito baixo',
            placeholder:'Muito Baixo',
            riskColor: theme.risk.veryLow
        },
        {
            id:5,
            value:'baixo',
            placeholder:'Baixo',
            riskColor: theme.risk.low
        },
        {
            id:6,
            value:'medio',
            placeholder:'Médio',
            riskColor: theme.risk.medium,
        },
        {
            id:7,
            value:'alto',
            placeholder:'Alto',
            riskColor: theme.risk.high
        },
    ]

    const updateRiskFilter = (id: number) => {
        if(id === selectedRiskFilter){ // Verifica se o filtro de risco selecionado é diferente do atual
            setSelectedRiskFilter(-1); // Se o filtro de risco selecionado for o mesmo, desmarca
            return;
        }
        setSelectedRiskFilter(id); // Atualiza o filtro de risco selecionado
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
        if(valueFilters) filtersToUpdate.push(valueFilters[selectedValueFilter! -1]);// se houver um filtro de valor selecionado, adiciona ao array
        if(riskFilters) filtersToUpdate.push(riskFilters[selectedRiskFilter! - valueFilters.length -1]);//se houver um filtro de risco selecionado, adiciona ao array. Diminuímos o valor do id do filtro de risco pelo tamanho do array de filtros de valor para manter a lógica correta.
        setFilters(filtersToUpdate);
        router.push('/fundosInvestimentos');
    }

    return(
        <View>
            <View>
                <Text style={style.categoriesTitle}>Aplicação Inicial</Text>
                <View style={style.categoriasCards}>
                    {valueFilters.map((e)=>
                        <FilterOption
                            key={e.id}
                            info={e}
                            isSelected={selectedValueFilter === e.id}
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
                            isSelected={selectedRiskFilter === e.id}
                            onSelect={(e) => updateRiskFilter(e)}
                            height={22}
                            width={94}
                        />
                    )}
                </View>
            </View>
            <NavigationButton route={()=> updateFilters()} text={"fundos de investimento"} icon card iconName="wallet" IconHeigth={24}/>
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
        categoriasCards:{
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
    });
}