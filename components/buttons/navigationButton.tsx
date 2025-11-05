import { useTheme } from '@/hooks/useTheme';
import { Pressable, StyleSheet, Text } from 'react-native';

interface NavigationButtonProps {
  onPress: () => void;
  text: string;
  transparentStyle?: boolean;
  disabled?: boolean;
  width?: number;
  height?: number;
}

export const NavigationButton = ({
  onPress,
  text,
  transparentStyle,
  disabled,
  width = 180,
  height = 29,
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
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          width: width,
          height: height,
        },
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </Pressable>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    container: {
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
      borderWidth: 1,
    },
    text: {
      fontSize: 18,
      fontWeight: '500',
    },
  });
};

