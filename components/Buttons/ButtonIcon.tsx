import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StyledText } from '../StyledText';
import { useTheme } from '@/hooks/useTheme';
import { StylesType } from '@/@Types/stylesType';
import { useAlanaContext } from '@/src/contexts/alanaContext';

interface ButtonIconProps {
  route: () => void;
  text: string;
  iconName: string;
  IconHeight?: number;
}

export const ButtonIcon = ({ route, text, iconName, IconHeight = 24 }: ButtonIconProps) => {
  const theme = useTheme();
  const userProfile = useAlanaContext()?.userProfile;
  const styles = getStyles(theme);

  return (
    <Pressable onPress={route} style={styles.button}>
      <View style={styles.iconWrapper}>
        <MaterialIcons name={iconName as any} size={IconHeight} color={userProfile =='common'? theme.tint:theme.text} />
      </View>

      <StyledText
        style={[styles.text,{ color: userProfile =='common'? theme.tint:theme.text, textAlign: "left", maxWidth:70 }]}
        numberOfLines={2}
      >
        {text}
      </StyledText>
    </Pressable>
  );
};

const getStyles = (theme: StylesType) =>
  StyleSheet.create({
    button: {
      width: 112,
      height: 64,
      borderRadius: 12,
      display:'flex',
      flexDirection:'row',
      alignItems: 'center',
      justifyContent:'center',
      backgroundColor: theme.backgroundCards,
      boxSizing:'border-box',
      padding:4,
      gap:2
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