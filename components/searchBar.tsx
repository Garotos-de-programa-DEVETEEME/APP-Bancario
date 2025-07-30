import { stylesType } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { View, TextInput, StyleSheet } from "react-native"
import { ListFilter, Search } from 'lucide-react';


interface SearchBarProps {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    filter?: boolean;
}


export const SearchBar = ({placeholder, value, onChangeText, filter= false}: SearchBarProps) => {

    const theme = useTheme();
    const styles = getStyles(theme, filter);
    
    return(
        <View style={styles.container}>
            <View style={styles.searchICons} >
                {/*  <Search style={styles.searchIcon}/>*/}
                <TextInput 
                    style={styles.searchTextInput}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                />
            </View>
            {/*<ListFilter style={styles.filterIcon}/>*/}
        </View>
    );
};

const getStyles = (theme: stylesType, filter:boolean) => {
    return StyleSheet.create({
        container: {
            backgroundColor:theme.backgroundCards,
            width: 400,
            height:33,
            borderRadius:10,
            alignSelf:'center',
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignContent:'center',
            boxSizing:'border-box',
            marginTop:24,
        },
        searchICons:{
            alignSelf:'center',
            marginLeft:4 ,
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap: 4,
        },
        searchTextInput:{
            color: theme.alternativeIcon,
            borderWidth:0,
        },
        filterIcon:{
            color: theme.alternativeIcon,
            alignSelf:'center',
            marginRight:18,
            display: filter? 'flex': 'none',
        },
        searchIcon:{
            color: theme.alternativeIcon,
            height:24,
            width:24,
        }
    })
}