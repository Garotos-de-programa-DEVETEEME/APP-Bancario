import { Pressable, StyleSheet } from 'react-native';
import { StyledText } from '../StyledText';
import { useTheme } from '@/hooks/useTheme';

interface NavigationButtonProps {
  onPress: () => void;
  text: string;
  transparentStyle?: boolean; // parâmetro que controla o estilo do componente
  disabled?: boolean;
  width?: number;
  height?: number;
}

export const NavigationButton = ({
  // componente de botão de navegação
  onPress,
  text,
  transparentStyle,
  disabled,
  width = 180,
}: NavigationButtonProps) => {
  const theme = useTheme();
  const styles = getStyles();

  const backgroundColor = disabled
    ? theme.disabledButton
    : transparentStyle
    ? 'transparent'
    : theme.tint;

  const borderColor = disabled ? theme.disabledButton : theme.tint;
  const textColor = transparentStyle ? theme.tint : theme.whiteText;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[disabled? {
        backgroundColor: theme.disabledButton,
        borderColor: theme.disabledButton
      }:{
        backgroundColor: transparentStyle ? 'transparent' : theme.tint,
        borderColor: theme.tint,
      }, {
        borderWidth: 1,
        width,
      }, styles.container]}
    >
      <StyledText style={[styles.text, { color: transparentStyle ? theme.tint : theme.whiteText }]}>{text}</StyledText>
    </Pressable>
  );
};

const getStyles = () =>{
  return StyleSheet.create({
    container: {
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderWidth: 1,
      // margins removed (follow global no-margin rule)
    },
    text: {
      fontSize: 18,
      fontWeight: '500',
    },
  });
}