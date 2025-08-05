import { StyleProp, TextStyle } from "react-native";

export type FilterType = {
    id: number,
    value: string,
    placeholder: string,
    style?: StyleProp<TextStyle>,
}