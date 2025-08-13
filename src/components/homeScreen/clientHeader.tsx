import { useTheme } from "@/src/hooks/useTheme";
import {
    StyleSheet,
    View,
    Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PatrimonyCard from "./patrimonyCard";
import { StyledText } from '../StyledText';
import { StylesType } from "@/src/themes/Colors";


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
                        <Image src={image} alt="Foto Cliente" style={styles.image} />
                        <View style={styles.textbox}>
                            <StyledText style={{ fontWeight: 'bold', color: theme.whiteText }}>
                                {title}
                            </StyledText>
                            <StyledText style={{ color: theme.whiteText }}>
                                Veja seu perfil
                            </StyledText>
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

const getStyles = (theme:StylesType) =>{
    const headerHeight = 138;
    const cardHeight = 90;
    const sobrepositionamento = 40;

    return StyleSheet.create({
        outerbox: {
            alignItems: 'center',
            height: headerHeight - sobrepositionamento + cardHeight,
            paddingBottom: 0,
        },
        header: {
            backgroundColor: '#3E75BC',
            width: '100%',
            height: headerHeight,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            justifyContent: 'center'
        },
        cardcontainer: {
            position: 'absolute',
            top: headerHeight - sobrepositionamento,
            width: '90%',
            alignItems: 'center',
            borderRadius: 15,
            borderWidth: 1,
            borderColor: theme.border,
            justifyContent: 'center',
            shadowColor: '#000', // Sombra iOS
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
        },
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between'
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