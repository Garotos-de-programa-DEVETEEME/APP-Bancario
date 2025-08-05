import { useTheme } from "@/src/hooks/useTheme";
import { stylesType } from "@/src/themes/Colors";
import { StyleSheet, TextInput, View } from "react-native";
import Octicons from 'react-native-vector-icons/Octicons';
import { router } from "expo-router";
import { useFilters } from "@/src/Context/filterContext";


interface SearchBarProps {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    filter?: boolean;
}

export const SearchBar = ({placeholder, value, onChangeText, filter= false}: SearchBarProps) => {

    const theme = useTheme();
    const styles = getStyles(theme, filter);
    const {filters, setFilters} = useFilters();

    return(
        <View style={styles.container}>
            <View style={styles.searchContainer} >
                <Octicons name="search" style={styles.searchIcon} size={24} />
                <TextInput
                    style={styles.searchTextInput}
                    placeholder={placeholder}
                    placeholderTextColor={theme.alternativeIcon}
                    value={filters[0]?.value}
                    onChangeText={onChangeText}
                />
            </View>
            <Octicons
                name="filter"
                style={styles.filterIcon}
                size={24}
                onPress={() => router.push('/fundosInvestimentos/filter')}
            />
            {/* <Filter
                page={'../../app/fundosInvestimentos/filter'}
            /> */}
        </View>
    );
};

const getStyles = (theme: stylesType, filter:boolean) => {
    return StyleSheet.create({
        container: {
            backgroundColor:theme.backgroundCards,
            width: 380,
            height:38,
            borderRadius:10,
            alignSelf:'center',
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignContent:'center',
            boxSizing:'border-box',
            marginTop:24,
        },
        searchContainer:{
            alignSelf:'center',
            marginLeft:4 ,
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap: 4,
        },
        searchTextInput:{
            color: theme.alternativeIcon,
        },
        searchIcon:{
            color: theme.alternativeIcon,
        },
        filterIcon:{
            color: theme.alternativeIcon,
            alignSelf:'center',
            marginRight:18,
        },
    })
}