import { Entypo, MaterialIcons } from "@expo/vector-icons"
import { View, StyleSheet } from "react-native"
import { StyledText } from "../StyledText"
import { useTheme } from "@/src/hooks/useTheme";
import { SwitchButton } from "../Buttons/switch";
import { StylesType } from "@/src/@Types/stylesType";


interface SwitchRowProps{
    title: string;
    iconName: string;
    switchValue:boolean;
    setSwitch: (e:boolean) => void;
    iconSize?:number;
    disabled?: boolean;
}

export const SwitchRow = ({title, iconName, switchValue, setSwitch, iconSize=16, disabled=false }:SwitchRowProps) =>{
    const theme = useTheme();
    const style = getStyles(theme, disabled);
    
    return(
        <View style={style.switchRow}>{/*TODO implementar o alana mode */}
            <View style={style.textSwitch}>
                <MaterialIcons name={iconName as any} color={disabled? theme.backgroundCards:theme.tint} size={iconSize} />
                <StyledText style={style.title}>{title}</StyledText>
            </View>
            <SwitchButton value={switchValue} onValueChange={setSwitch}/>
        </View>

    )
}


const getStyles = (theme:StylesType, disabled:boolean) => {
    return StyleSheet.create({
        container:{
            display:'flex', 
            gap:10,
            marginTop:10,
        },
        contentContainer:{
            width:'5%',
            alignSelf:'center',
        },
        switchRow:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            borderBottomColor:theme.border,
            borderBottomWidth:1,
            paddingBottom:12,
        },
        textSwitch:{
            display:'flex',
            flexDirection:'row',
            gap:8,
            alignItems:'center'
        },
        title:{
            color:disabled? theme.backgroundCards:theme.text,
            fontSize:16,
        },
    })
}