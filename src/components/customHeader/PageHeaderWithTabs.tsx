import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import HeaderTabs from './HeaderTabs'
import { StyledText } from '../StyledText'
import { StylesType } from '@/src/themes/Colors'
import { useTheme } from '@/src/hooks/useTheme'

interface PageHeaderProps {
  title: string;
  tabTitle: 'carteira' | 'fundos';
}

export default function PageHeaderWithTabs({ title, tabTitle}: PageHeaderProps) {
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = React.useState<'carteira' | 'fundos'>(tabTitle);

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.buttonContainer}
        >
          <Ionicons name='arrow-back' size={24} color={theme.tint} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <StyledText style={styles.title}>{title}</StyledText>
        </View>
        <View style={styles.buttonContainer} />
      </View>
      <HeaderTabs activeTab={activeTab} setActiveTab={(e)=> setActiveTab(e)} />
    </View>
  )
}

const getStyles = (theme: StylesType) => {
  return StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.backgroundCards,
  },
  topBarContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
})
}