import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import "../../global.css";

import { useColorScheme } from 'react-native';
import { FiltersProvider } from '../Context/filterContext';

import PageHeaderWithTabs from '../components/customHeader/PageHeaderWithTabs';
import SimpleHeader from '../components/customHeader/SimpleHeader';

SplashScreen.preventAutoHideAsync();

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
          <Stack.Screen name='index' options={{ headerShown: false }} />
          <Stack.Screen
            name='telaInicial/index'
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='carteira/resgatar/index'
            options={{
              header: () => (
                <SimpleHeader title='Resgatar' />
              ),
            }}
          />
          <Stack.Screen
            name='pagesWithTabs/index'
            options={{
              header: () => (
                <SimpleHeader title='Banetes DTVM' />
              ),
            }}
          />

          <Stack.Screen
            name='fundosInvestimentos/filter/index'
            options={{
              header: () => <SimpleHeader title='Filtros' />,
            }}
          />

          <Stack.Screen
            name='fundosInvestimentos/investir/index'
            options={{
              header: () => (
                <SimpleHeader title='Investir' />
              ),
            }}
          />

          <Stack.Screen
            name='fundosInvestimentos/saibaMais/index'
            options={{
              header: () => <SimpleHeader favorite title='Fundo de Investimentos' />,
            }}
          />

          <Stack.Screen
            name='simularInvestimento/index'
            options={{
              header: () => <SimpleHeader title='Simular Investimento' />,
            }}
          />

          <Stack.Screen
            name='simularInvestimento/detalhesFundo/index'
            options={{
              header: () => <SimpleHeader title='Simular Investimento' />,
            }}
          />
          
          <Stack.Screen name='+not-found' />
        </Stack>
        <StatusBar style='auto' />
      </ThemeProvider>
    </FiltersProvider>
  );
}
