import { useTheme } from "@/src/hooks/useTheme";
import { StylesType } from "@/src/themes/Colors";
import { StyledText } from '../StyledText';
import { useState } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type PatrimonyCardProps = {
    value: string;
    borderSize?: number;
}

export default function PatrimonyCard({
    value,
    borderSize = 15,
}: PatrimonyCardProps) {

    const theme = useTheme();
    const styles = getStyles(theme, borderSize);

    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }

    return(
            <View style={styles.containerChildren}>
                <View style={styles.div}>
                    <View style={styles.left}>
                        <StyledText style={{ fontWeight: 'bold', color: theme.text, fontSize: 18 }}>Meu Patrimônio</StyledText>
                        <StyledText style={{ fontWeight: 400, color: theme.textSecundary, fontSize: 15, marginTop: 4 }}>Saldo líquido</StyledText>
                        <StyledText style={{ fontWeight: 'bold', color: theme.text, fontSize: 15 }}>
                            {isVisible ? `R$ ${value}` : 'R$ ••••••'}
                        </StyledText>
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

const getStyles = (theme: StylesType, borderSize:number) =>{
    return StyleSheet.create({
        containerChildren: {
            backgroundColor: theme.background,
            height: 90,
            width: '100%',
            justifyContent: 'center',
            borderRadius: borderSize,
        },
        div: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom:10,
        },
        left: {
            marginLeft: 15,
            gap: 2,
        },
        visibility: {
            marginRight: 15,
        },
    });
};