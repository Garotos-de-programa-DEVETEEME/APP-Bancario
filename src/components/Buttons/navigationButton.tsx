import { useTheme } from '@/src/hooks/useTheme';
import { StylesType } from '@/src/themes/Colors';
import { Pressable, StyleSheet } from 'react-native';
import { StyledText } from '../StyledText';

interface NavigationButtonProps {
  onPress: () => void; // a função aqui deve conter um () => router.push()
  text: string;
  transparentStyle?: boolean;
  disabled?: boolean;
  width?: number;
}

export const NavigationButton = ({
  //componente de botão de navegação
  onPress,
  text,
  transparentStyle,
  disabled,
  width,
}: NavigationButtonProps) => {
  const theme = useTheme();
  const styles = getStyles(theme, transparentStyle, width);

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
  width: number = 180,
) => {
  return StyleSheet.create({
    buttonContainer: {
      backgroundColor: transparentStyle ? 'transparent' : theme.tint,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 16,
      marginBottom: 8,
      borderColor: theme.tint,
      borderWidth: 1,
      width: width,
    },
    buttonText: {
      color: transparentStyle ? theme.tint : theme.whiteText,
      fontSize: 18,
      fontWeight: 500,
    },
  });
};
