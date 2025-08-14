import EntrarButton from '@/src/components/Buttons/EntrarButton'
import { router } from 'expo-router'
import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native'

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: 'https://legacy.reactjs.org/logo-og.png' }}
        style={styles.background}
        resizeMode='cover'
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content} />

          <View style={styles.buttonwrapper}>
            <EntrarButton
              title='Cliente'
              onPress={() => router.push('/telaInicial')}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
  },
  buttonwrapper: {
    height: 160,
    alignItems: 'center',
  },
})
