import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import {StyledText} from '../StyledText';

interface DocumentButtonProps {
  type?: 'default' | 'row';
  alternativeIcon?: boolean;
  title: string;
  documentoUri?: string;
}

export const DocumentButton = ({ type = 'default', title, alternativeIcon = false }: DocumentButtonProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.wrapper}>
      <Pressable style={[styles.container, type === 'row' && styles.rowContainer]} onPress={() => { /* navegar para documento */ }}>
        {alternativeIcon ? (
          <Ionicons name="receipt" size={type === 'row' ? 14 : 26} color={theme.text} style={styles.icon} />
        ) : (
          <Image source={require('@/src/assets/Document.png')} style={[styles.image, { width: type === 'row' ? 14 : 26, height: type === 'row' ? 14 : 26 }]} />
        )}
        <StyledText style={styles.title}>{title}</StyledText>
      </Pressable>
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    wrapper: {
      width: '100%',
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'transparent',
      borderRadius: 10,
      padding: 12,
    },
    rowContainer: {
      justifyContent: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      paddingVertical: 8,
    },
    icon: {
      marginRight: 8,
    },
    image: {
      resizeMode: 'contain',
      marginRight: 8,
    },
    title: {
      fontSize: 14,
    },
  });