import 'react-native-reanimated'
import React, { useEffect } from 'react'
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

import { useColorScheme } from '@/src/hooks/useColorScheme'
import { FiltersProvider } from '../Context/filterContext'

import PageHeaderWithTabs from '../components/customHeader/PageHeaderWithTabs'
import SimpleHeader from '../components/customHeader/SimpleHeader'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()

  const [fontsLoaded, error] = useFonts({
    'Whitney-Regular': require('../assets/fonts/whitney-medium.otf'),
    'Whitney-Bold': require('../assets/fonts/whitney-bold.otf'),
  })

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) {
    return null
  }

  return (
    <FiltersProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="telaInicial/index"
            options={{
              headerShown:false,
            }}
          />
          
          <Stack.Screen
            name='fundosInvestimentos/index'
            options={{
              header: () => <PageHeaderWithTabs title="Banetes DTVM" tabTitle='fundos' />,
            }}
          />
          <Stack.Screen
            name="carteira/index"
            options={{
              header: () => <PageHeaderWithTabs title="Banetes DTVM" tabTitle='carteira' />,
            }}
          />

          <Stack.Screen
            name='fundosInvestimentos/filter/index'
            options={{
              header: () => <SimpleHeader title='Filtros' />,
            }}
          />
          
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style='auto' />
      </ThemeProvider>
    </FiltersProvider>
  )
}
