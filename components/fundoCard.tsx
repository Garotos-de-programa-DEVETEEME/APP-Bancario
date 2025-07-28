import { stylesType, Styles } from "@/constants/Colors";
import { fundosType } from "@/constants/Types/fundos";
import { useColorScheme, View, Text } from "react-native";

interface FundsCardProps{
    fund:fundosType
}

export const FundsCard:React.FC<FundsCardProps> = ({fund, }) => {
    const colorScheme = useColorScheme();
    const theme:stylesType = colorScheme === 'dark'? Styles.dark:Styles.light;
    return(
        <View>
            <Text>
                {fund.name}
            </Text>
        </View>
    );
}