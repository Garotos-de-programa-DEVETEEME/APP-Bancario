import EntrarButton from '@/src/components/Buttons/EntrarButton';
import { router } from 'expo-router';
import { ImageBackground, SafeAreaView, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1">
      <ImageBackground
        source={require('../assets/Images/image-33.png')}
        className="flex-1"
        resizeMode="cover"
      >
        <SafeAreaView className="flex-1 justify-end px-5 pb-10">
          <View className="flex-1" />

          <View className="h-40 items-center">
            <EntrarButton
              title="Cliente"
              onPress={() => router.push('/telaInicial')}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}