import { View } from "react-native";
import { StyledText } from "../StyledText";

interface TextRowProps{
    themeText: string; 
    left: string; 
    right: string | number,
    fontSize?: number
    bold?:boolean
}

export function TextRow({ themeText, left, right, fontSize=16, bold=false }: TextRowProps) {
  return (
    <View className="flex-row items-center justify-between border-b border-b-gray-300 pb-2 mb-2">
      <StyledText style={{ color: themeText, fontSize:fontSize, fontWeight:bold?'bold':'300' }}>
        {left}
      </StyledText>
      <StyledText style={{ color: themeText, fontSize:fontSize }}>
        {right}
      </StyledText>
    </View>
  );
}