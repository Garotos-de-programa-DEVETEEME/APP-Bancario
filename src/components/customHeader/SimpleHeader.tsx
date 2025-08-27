import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyledText } from '../StyledText'

interface SimpleHeaderProps {
  title: string
}

export default function SimpleHeader({ title }: SimpleHeaderProps) {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

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
  )
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    color: '#000',
    textAlign: 'center',
  },
})
