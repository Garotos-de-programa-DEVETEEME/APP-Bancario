import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router'

type ActiveTab = 'carteira' | 'fundos';

interface HeaderTabsProps {
  activeTab: ActiveTab;
}

export default function HeaderTabs({ activeTab }: HeaderTabsProps) {

  const router = useRouter();

  const handleCarteiraPress = () => {
    Alert.alert('Em Breve', 'A funcionalidade de Carteira será implementada em breve.');
  };

  const handleFundosPress = () => {
    router.push('/fundosInvestimentos'); 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={handleCarteiraPress} 
        style={[
          styles.tabButton,
          activeTab === 'carteira' && styles.activeTabButton
        ]}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'carteira' && styles.activeTabText,
          ]}
        >
          Carteira
        </Text>
        {activeTab === 'carteira' && <View style={styles.activeIndicator} />}
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={handleFundosPress} 
        style={[
          styles.tabButton,
          activeTab === 'fundos' && styles.activeTabButton
        ]}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'fundos' && styles.activeTabText,
          ]}
        >
          Fundos de Investimento
        </Text>
        {activeTab === 'fundos' && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
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
    backgroundColor: '#EAF5FF',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: '#005A9C',
    fontWeight: 'bold',
  },
  activeIndicator: {
    height: 3,
    backgroundColor: '#005A9C',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});