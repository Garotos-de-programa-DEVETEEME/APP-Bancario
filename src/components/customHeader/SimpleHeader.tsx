import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/src/hooks/useTheme";
import { StyledText } from "../StyledText";

interface SimpleHeaderProps {
  title: string;
}

export default function SimpleHeader({ title }: SimpleHeaderProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <View
      className="w-full flex-row items-center justify-between px-3"
      style={{
        paddingTop: insets.top,
        backgroundColor: theme.background, // fundo do header
      }}
    >
      {/* Botão voltar */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        className="w-12 h-12 items-center justify-center"
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color={theme.tint ?? "#005A9C"} />
      </TouchableOpacity>

      {/* Título centralizado */}
      <View className="flex-1 items-center">
        <StyledText
          className="text-[18px] font-bold"
          style={{ color: theme.text }}
          numberOfLines={1}
        >
          {title}
        </StyledText>
      </View>

      {/* Espaço à direita para balancear o título (mesma largura do botão esquerdo) */}
      <View className="w-12 h-12" />
    </View>
  );
}
