import ClientHeader from "@/src/components/homeScreen/clientHeader";
import { useTheme } from "@/src/hooks/useTheme";
import { stylesType } from "@/src/themes/Colors";
import {
    StyleSheet, View
} from 'react-native';


export default function TelaInicial() {

    const theme = useTheme();
    const styles = getStyles(theme);

    return(
        <View>
            <ClientHeader
                title = 'Cliente'
                image = 'https://legacy.reactjs.org/logo-og.png'
                value = '-1'
            />
        </View>
    );
};

const getStyles = (theme: stylesType) =>{
    return StyleSheet.create({
        container: {
            flexDirection: 'row',

        },
        header: {
            backgroundColor: '#3E75BC',
            width: '100%',
            height: 137,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
        },
    });
};