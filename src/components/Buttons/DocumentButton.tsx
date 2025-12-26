import { Pressable, View } from "react-native";
import { StyledText } from "../StyledText";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/src/hooks/useTheme";

interface DocumentButtonProps{
    type: 'default' | 'row';
    title: string;
    documentoUri: string; 
    alternativeIcon?: boolean;
}

export const DocumentButton = ({type, title, alternativeIcon=false, documentoUri}:DocumentButtonProps) =>{
    const theme = useTheme();
    return(
        <View>
            <Pressable style={[{display:'flex', flexDirection:'row', alignItems:'center', width:160, height:64 }, type === 'default'? {boxSizing:'content-box' ,justifyContent:'center', borderWidth:2, borderColor:theme.textSecundary, borderRadius:10, }:{justifyContent:'flex-start', borderBottomColor:theme.border, borderBottomWidth:1, width:'100%', height:48, gap:16, paddingLeft:8,}]}>{/*TODO adicionar navegação para o documentoUri */}
                {alternativeIcon? (
                    <Ionicons name="receipt-outline" color={theme.text} size={type ==='row'? 14:26} />
                ):(
                    <MaterialCommunityIcons name="file" color={theme.text} size={type ==='row'? 14:26} />
                )}
                <StyledText style={{fontSize:16, fontWeight:'500', color:theme.text}}> {title} </StyledText>
            </Pressable>
        </View>
    );    
}