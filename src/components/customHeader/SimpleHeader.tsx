import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyledText } from '../StyledText';
import { StylesType } from '@/src/themes/Colors';
import { useTheme } from '@/src/hooks/useTheme';

interface SimpleHeaderProps {
  title: string;
}

export default function SimpleHeader({ title }: SimpleHeaderProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.buttonContainer}
      >
        <Ionicons name='arrow-back' size={24} color='#005A9C' />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <StyledText style={styles.title}>{title}</StyledText>
      </View>
      <View style={styles.buttonContainer} />
    </View>
  );
}

const getStyles = (theme: StylesType) => {
  return StyleSheet.create({
    container: {
      height: 80,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.backgroundCards,
      paddingHorizontal: 5,
    },
    buttonContainer: {
      width: 50,
      alignItems: 'center',
    },
    titleContainer: {
      flex: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      textAlign: 'center',
    },
  });
};
