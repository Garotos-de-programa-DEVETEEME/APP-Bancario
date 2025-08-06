import { useTheme } from "@/src/hooks/useTheme";
import { stylesType } from "@/src/themes/Colors";
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PatrimonyCard from "./patrimonyCard";


type ClientHeaderProps = {
    title: string;
    image: string;
    value: string;
}

export default function ClientHeader({
    title,
    image,
    value,
}: ClientHeaderProps) {

    const theme = useTheme();
    const styles = getStyles(theme);

    return(
        <View style={styles.outerbox}>
            <View style={styles.header}>
                <View style={styles.container}>
                    <View style={styles.left}>
                        <img src={image} alt="Foto Cliente" style={styles.image} />
                        <View style={styles.textbox}>
                            <Text style={{ fontWeight: 'bold', color: theme.whiteText }}>
                                {title}
                            </Text>
                            <Text style={{ color: theme.whiteText }}>
                                Veja seu perfil
                            </Text>
                        </View>
                    </View>
                    <View style={styles.right}>
                        <MaterialCommunityIcons name="bell-outline" color="#FFF" size={24} />
                        <MaterialCommunityIcons name="exit-to-app" color="#FFF" size={24} />
                    </View>
                </View>
            </View>
            <View style={styles.cardcontainer}>
                <PatrimonyCard value={value} />
            </View>
        </View>
    );
}

const getStyles = (theme: stylesType) =>{
    const headerHeight = 138;
    const cardHeight = 80;

    return StyleSheet.create({
        outerbox: {
            alignItems: 'center'
        },
        cardcontainer: {
            position: 'absolute',
            top: headerHeight - (cardHeight / 2),
            width: '90%',
            alignItems: 'center'
        },
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        header: {
            backgroundColor: '#3E75BC',
            width: '100%',
            height: 125,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            justifyContent: 'center'
        },
        left: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        right: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            marginRight: '5%'
        },
        image: {
            height: 40,
            width: 40,
            borderRadius: 25,
            marginLeft: '10%'
        },
        textbox: {
            marginLeft: 10,
            gap: 2
        }
    });
};