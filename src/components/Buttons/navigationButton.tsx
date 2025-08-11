import { useTheme } from "@/src/hooks/useTheme";
import { StylesType } from "@/src/themes/Colors";
import { Pressable, StyleSheet, Text } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface navigationButtonProps{
    route: () => void;
    text:string;
    card?:boolean;
    icon?:boolean;//caso o icone seja verdadeiro deve-se colocar o iconName e o iconHeigth
    iconName?: string;
    IconHeigth?: number
}

export const NavigationButton = ({route: route, text, card, icon, iconName, IconHeigth}:navigationButtonProps) =>{

    const theme = useTheme();
        const styles = getStyles(theme, card, IconHeigth);

    return(
        <Pressable
            style={styles.buttonContainer}
            onPress={route}
        >
            {(icon && iconName) && (
                <MaterialIcons name={iconName} style={styles.icon} size={IconHeigth!}/>
            )}
            <Text style={styles.buttonText}>
                {text}
            </Text>
        </Pressable>
    );
}

const getStyles = (theme: stylesType, card?:boolean, IconHeigth?:number) =>{
    return StyleSheet.create({
        buttonContainer:{
            backgroundColor: card? theme.backgroundCards : theme.tint,
            borderRadius: 10,
            height: IconHeigth? IconHeigth!:37,
            width: IconHeigth? 117:180,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16,
            marginBottom: 8,
            borderColor: 'transparent',
            borderWidth: 1,
            display:'flex',
            flexDirection:'row',
            gap: 10,
            padding: 8,
        },
        buttonText:{
            color: card ? theme.tint : theme.whiteText,
        },
        icon:{
            color:theme.tint,
        }
    })
}