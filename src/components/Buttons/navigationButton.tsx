import { StylesType } from '@/src/@Types/stylesType';
import { useTheme } from '@/src/hooks/useTheme';
import { Pressable, StyleSheet } from 'react-native';
import { StyledText } from '../StyledText';

interface NavigationButtonProps {
  onPress: () => void;
  text: string;
  transparentStyle?: boolean; //parametro que controla o estilo do componente
  disabled?: boolean;
  width?: number;
  height?: number;
}

export const NavigationButton = ({
  //componente de botão de navegação
  onPress,
  text,
  transparentStyle,
  disabled,
  width,
  height,
}: NavigationButtonProps) => {
  const theme = useTheme();
  const styles = getStyles(theme, transparentStyle, disabled, width, height);

  return (
    <Pressable
      style={styles.buttonContainer}
      onPress={onPress}
      disabled={disabled}
    >
      <StyledText style={styles.buttonText}>{text}</StyledText>
    </Pressable>
  );
};

const getStyles = (
  theme: StylesType,
  transparentStyle?: boolean,
  disabled?: boolean,
  width: number = 180,
  height?: number,
) => {
  const backgroundColor = disabled
        ? theme.disabledButton
        : transparentStyle
            ? 'transparent'
            : theme.tint;
  const borderColor = disabled ? theme.disabledButton : theme.tint;
  return StyleSheet.create({
    buttonContainer: {
      backgroundColor: backgroundColor,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 16,
      marginBottom: 8,
      borderColor: borderColor,
      borderWidth: 1,
      width: width,
      height: height,
    },
    buttonText: {
      color: transparentStyle ? theme.tint : theme.whiteText,
      fontSize: 18,
      fontWeight: 500,
    },
  });
};
