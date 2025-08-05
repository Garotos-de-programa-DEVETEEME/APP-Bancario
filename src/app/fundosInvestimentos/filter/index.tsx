import { FilterType } from "@/src/@Types/Filter";
import { Dispatch, SetStateAction } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

interface filterFundsPageProps{
    currentFilters: FilterType[];
    setFilters: Dispatch<SetStateAction<FilterType[]>>;
}

export default function FilterFundsPage({currentFilters, setFilters}:filterFundsPageProps) {
    const newFilters:FilterType[] = []
    const filterOptions: FilterType[] = [
        {
            id:1,
            value:'1000',
            placeholder:'R$ 1000',
            style: styles.example
        },
    ]

    const addFilter = (e: FilterType) =>{
        newFilters.push(e);
    }

    const updateFilters = () =>{
        setFilters(newFilters)
    }

    return(
        <View>
            <Text>
                a
            </Text>
            <Pressable
                onPress={() => updateFilters()}

            >
                <Text style={{color:'#FFFF'}}>
                    Filtrar
                </Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    example:{
        color:'#FFFF'
    }
});