import EntrarButton from '@/components/EntrarButton';
import { Styles } from '@/constants/Colors';
import {
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native';

export default function App() {
  const theme = 'light'; // ou useColorScheme() para detectar dinamicamente
  const currentStyle = Styles[theme];

  return (
    <ImageBackground
      source={'https://legacy.reactjs.org/logo-og.png'}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content} />

        <EntrarButton
          title="Cliente"
          theme={theme}
          onPress={() => console.log('Entrar clicado')}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 40, // espaço entre botão e fundo da tela
  },
  content: {
    flex: 1,
  },
});