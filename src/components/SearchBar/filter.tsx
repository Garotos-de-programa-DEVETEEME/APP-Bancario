import { FilterType } from '@/src/@Types/Filter';
import { useTheme } from '@/src/hooks/useTheme';
import { stylesType } from '@/src/themes/Colors';
import { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';

interface filterProps{
    page: string;//string com os nomes das paginas que terao filtros;
    filters: FilterType[];
    function: Dispatch<SetStateAction<FilterType[]>>;

}

export const Filter = ({page, filters, function: setFilters }:filterProps) => {
    const [filterActive, setFilterActive] = useState(false);
    const navigation = useNavigation<NavigationProp>();

    function changeFilters(newFilters:FilterType[]){
        setFilterActive(false);
        setFilters(newFilters);
    }

    const theme = useTheme();
    const styles = getStyles(theme, filterActive);

    return(
        <>
            <Octicons
                name="filter"
                style={styles.filterIcon}
                size={24}
                onPress={() => navigation.navigate('/fundosInvestimentos/filter')}
            />
        </>

    );
};

const getStyles = (theme: stylesType, filterActive:boolean) => {
    return StyleSheet.create({
        filterIcon:{
            color: theme.alternativeIcon,
            alignSelf:'center',
            marginRight:18,
            display: filterActive? 'none':'flex',
        },
        filterPage:{
            display: filterActive? 'flex':'none',

        }
    })
}