import { View } from "react-native";
import { StyledText } from "../StyledText";
import { useTheme } from "@/src/hooks/useTheme";

interface TextRowProps{
    left: string; 
    right: string | number,
    fontSize?: number
    bold?:boolean
}

export function TextRow({left, right, fontSize=16, bold=false }: TextRowProps) {
  const theme = useTheme();
  return (
    <View className="flex-row items-center justify-between border-b pb-2 mb-2" style={{borderBottomColor:theme.border, borderBottomWidth:1}}>
      <StyledText style={{ color: theme.text, fontSize:fontSize, fontWeight:bold?'bold':'300' }}>
        {left}
      </StyledText>
      <StyledText style={{ color: theme.text, fontSize:fontSize }}>
        {right}
      </StyledText>
    </View>
  );
}