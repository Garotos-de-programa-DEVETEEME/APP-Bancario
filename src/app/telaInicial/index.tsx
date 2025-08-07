import ClientHeader from "@/src/components/homeScreen/clientHeader";
import { useTheme } from "@/src/hooks/useTheme";
import { StylesType } from "@/src/themes/Colors";
import {
    StyleSheet
} from 'react-native';


export default function TelaInicial() {

    const theme = useTheme();
    const styles = getStyles(theme);

    return(
        <ClientHeader
            title = 'Cliente'
            image = 'https://legacy.reactjs.org/logo-og.png'
            value = '-1'
        />
    );
};

const getStyles = (theme: StylesType) =>{
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