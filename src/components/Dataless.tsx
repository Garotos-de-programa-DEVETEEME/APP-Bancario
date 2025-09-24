import { View, Text } from "react-native";
import { useTheme } from "../hooks/useTheme";

export const DataLess = () =>{
    const theme = useTheme();

    return(
        <View className="flex-1 items-center justify-center" style={{ backgroundColor: theme.background }}>
            <Text style={{ color: theme.text }}>Erro: Dados do fundo não encontrados.</Text>
        </View>
    );
}