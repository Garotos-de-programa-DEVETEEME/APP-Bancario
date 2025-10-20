import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { StyledText } from "../StyledText";
import { TextRow } from "./rowText";
import { useTheme } from "@/hooks/useTheme";

interface ExpandTextProps{
    title: string,
    expandedItens: {
        left: string,
        right?: string | number,
    }[],
    defaultExpanded?: boolean
}

export const ExpandedText = ({title, expandedItens, defaultExpanded=false}:ExpandTextProps) =>{
    const [expanded, setExpanded] = useState(defaultExpanded);
    const theme = useTheme();
    return(
        <View style={{borderBottomWidth:1, borderBottomColor:theme.border, paddingVertical: 12}}>
            <Pressable onPress={() => setExpanded(prev => !prev)}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap:4}}>
                    <MaterialCommunityIcons name={expanded?"menu-down":"menu-right"} color={theme.text} size={24} />
                    <StyledText className="font-bold text-[16px]" style={{color:theme.text}}>{title}</StyledText>
                </View>
            </Pressable>
            {expanded && (
                <View style={{marginTop: 12, gap: 8, marginHorizontal:20}}>
                    {expandedItens.map((item, index)=>(
                        <TextRow key={index} left={item.left} right={item.right? item.right:'Não há'} />
                    ))}
                </View>
            )}
        </View>
    );
}