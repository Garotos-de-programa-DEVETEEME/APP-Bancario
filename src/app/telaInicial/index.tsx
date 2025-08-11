import { ButtonIcon } from "@/src/components/Buttons/ButtonIcon";
import ClientHeader from "@/src/components/homeScreen/clientHeader";
import { useTheme } from "@/src/hooks/useTheme";
import { StylesType } from "@/src/themes/Colors";
import { router } from "expo-router";
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
                route={()=> router.push('/fundosInvestimentos')}//TODO: criar a funcionalidade
                text="Minha Carteira"
                iconName="wallet"
                IconHeigth={24}
                />
                <ButtonIcon
                route={()=> router.push('/fundosInvestimentos')}
                text="Fundos de Investimento"
                iconName="inventory"
                IconHeigth={24}
                />
                <ButtonIcon
                route={()=> router.push('/fundosInvestimentos')}//TODO: criar a funcionalidade
                text="Simular Investimento"
                iconName="timeline"
                IconHeigth={24}
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
            marginTop: 45,
            display:'flex',
            flexDirection:'row',
            gap: 16,
            justifyContent:'center',
        }
    });
};