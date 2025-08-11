import { useTheme } from "@/src/hooks/useTheme";
import { StylesType } from "@/src/themes/Colors";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

interface NavigationButtonProps {
  onPress: () => void;// a função aqui deve conter um () => router.push()
  text: string;
  transparentStyle?: boolean;
  disabled?: boolean;
}

export const NavigationButton = ({
  onPress,
  text,
  transparentStyle,
  disabled,
}: NavigationButtonProps) => {
  const theme = useTheme();
  const styles = getStyles(theme, transparentStyle);

  return (
    <Pressable style={styles.buttonContainer} onPress={onPress} disabled={disabled}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

const getStyles = (
  theme: StylesType,
  transparentStyle?: boolean,
) => {
  const buttonContainerStyle: ViewStyle = {
    backgroundColor: transparentStyle ? "transparent" : theme.tint,
    borderRadius: 10, 
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
    borderColor: transparentStyle ? theme.tint : "transparent",
    borderWidth: 1,
  };

  return StyleSheet.create({
    buttonContainer: buttonContainerStyle,
    buttonText: {
      color: transparentStyle ? theme.tint : theme.whiteText,
      fontSize: 18,
      fontWeight: "bold",
    },
  });
};