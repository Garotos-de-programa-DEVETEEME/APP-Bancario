import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { StyledText } from '../StyledText';
import { useTheme } from '@/hooks/useTheme';
import { StylesType } from '@/@Types/stylesType';

type ActiveTab = 'carteira' | 'fundos' | string;

interface HeaderTabsProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function HeaderTabs({
  activeTab,
  setActiveTab,
}: HeaderTabsProps) {
  const router = useRouter();
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleCarteiraPress = () => {
    setActiveTab('carteira');
  };

  const handleFundosPress = () => {
    setActiveTab('fundos');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleCarteiraPress}
        style={[
          styles.tabButton,
          activeTab === 'carteira' && styles.activeTabButton,
        ]}
      >
        <StyledText
          style={[
            styles.tabText,
            activeTab === 'carteira' && styles.activeTabText,
          ]}
        >
          Carteira
        </StyledText>
        {activeTab === 'carteira' && <View style={styles.activeIndicator} />}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleFundosPress}
        style={[
          styles.tabButton,
          activeTab === 'fundos' && styles.activeTabButton,
        ]}
      >
        <StyledText
          style={[
            styles.tabText,
            activeTab === 'fundos' && styles.activeTabText,
          ]}
        >
          Fundos de Investimento
        </StyledText>
        {activeTab === 'fundos' && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme: StylesType) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: theme.background,
      paddingHorizontal: 16,
      height: 50,
      alignItems: 'center',
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      borderRadius: 8,
    },
    activeTabButton: {
      backgroundColor: theme.background,
    },
    tabText: {
      fontSize: 16,
      color: theme.text,
    },
    activeTabText: {
      color: theme.tint,
      fontWeight: 'bold',
    },
    activeIndicator: {
      height: 3,
      backgroundColor: theme.tint,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  });
};
