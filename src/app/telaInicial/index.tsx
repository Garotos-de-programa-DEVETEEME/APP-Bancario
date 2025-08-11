import { ButtonIcon } from "@/src/components/Buttons/ButtonIcon";
import ClientHeader from "@/src/components/homeScreen/clientHeader";
import { useTheme } from "@/src/hooks/useTheme";
import { StylesType } from "@/src/themes/Colors";
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

            <View style={styles.buttonbox}>
                <ButtonIcon
                route={function (): void {
                    throw new Error("Function not implemented.");
                } }
                text="Minha Carteira"
                iconName="wallet"
                IconHeigth={40}
                />
            </View>

        </View>
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
        buttonbox: {
            marginTop: 30
        }
    });
};