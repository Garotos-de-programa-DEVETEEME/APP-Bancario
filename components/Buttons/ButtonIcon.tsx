import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StyledText } from '../StyledText';
import { useTheme } from '@/hooks/useTheme';

interface ButtonIconProps {
  route: () => void;
  text: string;
  iconName: string;
  IconHeight?: number;
}

export const ButtonIcon = ({ route, text, iconName, IconHeight = 24 }: ButtonIconProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Pressable onPress={route} style={styles.button}>
      <View style={styles.iconWrapper}>
        <MaterialIcons name={iconName as any} size={IconHeight} color={theme.text} />
      </View>

      <StyledText
        style={[styles.text,{ color: theme.tint, textAlign: "left" }]}
        numberOfLines={2}
      >
        {text}
      </StyledText>
    </Pressable>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    button: {
      width: 100,
      height: 64,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    buttonPressed: {
      opacity: 0.8,
    },
    iconWrapper: {
      marginBottom: 6,
    },
    text: {
      fontSize: 12,
      textAlign: 'center',
    },
  });