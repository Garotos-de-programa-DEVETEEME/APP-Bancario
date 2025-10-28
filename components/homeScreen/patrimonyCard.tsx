import { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { StyledText } from "../StyledText";
import { useTheme } from "@/hooks/useTheme";
import { coinFormat } from "@/utils/coinFormat";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StylesType } from "@/@Types/stylesType";

type PatrimonyCardProps = {
  value: number;
  cointaned?: boolean;
};

export default function PatrimonyCard({ value, cointaned = false }: PatrimonyCardProps) {
  const theme = useTheme();
  const style = getStyles(theme);
  const [isVisible, setIsVisible] = useState(true);

  // animação de crossfade (0 = mascarado, 1 = visível)
  const progress = useSharedValue(1);

  // escala no botão do olho
  const eyeScale = useSharedValue(1);

  const onToggle = () => {
    const next = !isVisible;
    setIsVisible(next);
    progress.value = withTiming(next ? 1 : 0, {
      duration: 200,
      easing: Easing.out(Easing.ease),
    });
  };

  return (
    <View
      style={[cointaned? style.contained:style.defaultContainer , style.container]}
    >
      <View style={style.textContainer}>
        <View style={{marginLeft:4}}>
          <StyledText style={{ color: theme.text, fontWeight: "700" as any, fontSize:18 }}>
            Meu Patrimônio
          </StyledText>

          <StyledText className="mt-1" style={{ color: theme.text, fontWeight: "400" as any, fontSize: 15, marginTop: 4 }}>
            Saldo líquido
          </StyledText>

          <StyledText style={{ color: theme.text, fontWeight: "700" as any,fontSize:18, marginTop:2, height:22 }}>
            {isVisible? "R$ ••••••":coinFormat(value)}
          </StyledText>
        </View>

        <TouchableOpacity
          accessibilityLabel={isVisible ? "Ocultar saldo" : "Mostrar saldo"}
          onPressIn={() => (eyeScale.value = withTiming(0.92, { duration: 80 }))}
          onPressOut={() => (eyeScale.value = withTiming(1, { duration: 80 }))}
          onPress={onToggle}
          style={{marginTop:4, marginRight:4, padding:4}}
        >
          <View>
            <MaterialCommunityIcons
              name={isVisible ? "eye" : "eye-off"}
              size={20}
              color={theme.alternativeIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (theme:StylesType) => {
  return StyleSheet.create({
    container:{
      width:'100%',
      height:90,
      justifyContent:'center',
    },
    contained:{
      backgroundColor:'transparenth',
      borderRadius: 0,
    },
    defaultContainer:{
      backgroundColor:theme.background,
      elevation: 4,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      borderRadius:16
    },
    textContainer:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      marginHorizontal:12,
      marginVertical:20
    }

  })
}
