import { useTheme } from "@/src/hooks/useTheme";
import { stylesType } from "@/src/themes/Colors";
import {
    StyleSheet,
    View
} from 'react-native';

type PatrimonyCardProps = {
    value: string;
}

export default function PatrimonyCard({
    value,
}: PatrimonyCardProps) {

    const theme = useTheme();
    const styles = getStyles(theme);

    return(
        <View style={styles.container}>

        </View>
    );
}

const getStyles = (theme: stylesType) =>{
    return StyleSheet.create({
        container: {
            backgroundColor: theme.border,
            height: 75,
            width: '80%'
            
        }
    });
};