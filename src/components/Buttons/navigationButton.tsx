import { useTheme } from "@/src/hooks/useTheme";
import { StylesType } from "@/src/themes/Colors";
import { Pressable, StyleSheet, Text } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface navigationButtonProps{
    route: () => void;// a função aqui deve conter um () => router.push()
    text:string;
    transparentStyle?:boolean;
    card?:boolean;
    icon?:boolean;//caso o icone seja verdadeiro deve-se colocar o iconName e o iconHeigth
    iconName?: string;
    IconHeigth?: number
}

export const NavigationButton = ({route: route, text, transparentStyle, card, icon, iconName, IconHeigth}:navigationButtonProps) =>{

    const theme = useTheme();
        const styles = getStyles(theme, card, transparentStyle, IconHeigth);

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

const getStyles = (theme: StylesType, card?:boolean, transparentStyle?:boolean, IconHeigth?:number) =>{
    return StyleSheet.create({
        buttonContainer:{
            backgroundColor: card? theme.backgroundCards:transparentStyle? 'tranparent':theme.tint,
            borderRadius: 10,
            height: IconHeigth? IconHeigth!:37,
            width: IconHeigth? 117:180,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16,
            marginBottom: 8,
            borderColor: transparentStyle? theme.tint:'transparent',
            borderWidth: 1,
            display:'flex',
            flexDirection:'row',
            gap: 10,
            padding: 8,
        },
        buttonText:{
            color: transparentStyle? theme.tint:theme.whiteText
        },
        icon:{
            color:theme.tint,
        }
    })
}