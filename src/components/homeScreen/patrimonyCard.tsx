import { useTheme } from "@/src/hooks/useTheme";
import { StylesType } from "@/src/themes/Colors";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type PatrimonyCardProps = {
    value: string;
}

export default function PatrimonyCard({
    value,
}: PatrimonyCardProps) {

    const theme = useTheme();
    const styles = getStyles(theme);

    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }

    return(
        <View style={styles.container}>
            <View style={styles.div}>
                <View style={styles.left}>
                    <Text style={{ fontWeight: 'bold', color: theme.text, fontSize: 18 }}>Meu Patrimônio</Text>
                    <Text style={{ fontWeight: 'bold', color: theme.text, fontSize: 15 }}>
                        {isVisible ? `R$ ${value}` : 'R$ ••••••'}
                    </Text>
                </View>
                <TouchableOpacity onPress={toggleVisibility} style={styles.visibility}>
                    <MaterialCommunityIcons 
                        name={isVisible ? "eye" : "eye-off"} 
                        color={theme.alternativeIcon} 
                        size={20} 
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const getStyles = (theme: StylesType) =>{
    return StyleSheet.create({
        container: {
            backgroundColor: theme.border,
            height: 70,
            width: '100%',
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#3C3C3C',
            justifyContent: 'center'
        },
        left: {
            marginLeft: 15,
            gap: 2
        },
        visibility: {
            marginRight: 15,
        },
        div: {
            flexDirection: 'row',
            justifyContent: 'space-between', 
        }
    });
};