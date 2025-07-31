import { useColorScheme } from "react-native";
import { Styles, stylesType } from "../constants/Colors";

export const useTheme = ()=>{
    const colorScheme = useColorScheme();
    const theme:stylesType = colorScheme === 'dark'? Styles.dark:Styles.light;
    return theme;
}