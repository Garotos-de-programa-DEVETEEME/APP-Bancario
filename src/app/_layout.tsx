import { Stack } from 'expo-router'
import { AuthProvider } from '@/src/contexts/AuthContext'
import { useEffect } from 'react'
import { checkTokenValidity } from '@/src/services/authService'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import Toast from 'react-native-toast-message'
import toastConfig from '@/components/toast/toastConfig'
import { navigateToLogin, navigateToPanelHome } from '@/utils/navigation'
import { FiltersProvider } from '../contexts/filterContext'
import SimpleHeader from '@/components/customHeader/SimpleHeader'

export default function RootLayout() {
    return (
        <SafeAreaProvider style={styles.container}>
            <AuthProvider>
                <MainLayout />
            </AuthProvider>
            <Toast config={toastConfig} />
        </SafeAreaProvider>
    )
}

function MainLayout() {
    useEffect(() => {
        async function checkAuth() {
            const isValid = await checkTokenValidity()

            if (isValid) {
                navigateToPanelHome()
            } else {
                navigateToLogin()
            }
        }
        checkAuth()
    }, [])

    return (
      <FiltersProvider>
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />

            <Stack.Screen
                name="(panel)/profile/page"
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="(panel)/home/page"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="(panel)/home/PerfilCliente/page"
                options={{ header: () => <SimpleHeader title='Perfil' /> }}
            />
        </Stack>
        </FiltersProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
