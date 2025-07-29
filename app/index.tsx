import { Styles, stylesType } from "@/constants/Colors";
import { Link } from "expo-router";
import { Text, useColorScheme } from "react-native";

export default function Index() {
    const colorScheme = useColorScheme();
    const theme:stylesType = colorScheme === 'dark'? Styles.dark:Styles.light;
    return (
        <>
            <Text style={{color: theme.text}}>
                This is the index page of the app.
            </Text>
            <Link href="/fundosInvestimentos">
                <Text style={{color: theme.text}}>Ir para Fundos de Investimentos</Text>
            </Link>
        </>
    );
}