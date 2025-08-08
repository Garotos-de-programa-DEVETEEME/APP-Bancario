import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { FiltersProvider } from '../Context/filterContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, error] = useFonts({
    'Whitney-Regular': require('../assets/fonts/whitney-medium.otf'),
    'Whitney-Bold': require('../assets/fonts/whitney-bold.otf'),
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <FiltersProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home Page' }} />
            <Stack.Screen name="fundosInvestimentos/index" options={{ title: 'Fundos Investimentos' }} />
            <Stack.Screen name="fundosInvestimentos/filter/index" options={{ title: 'Filtros' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </FiltersProvider>
  );
}
