import SimpleHeader from '@/components/customHeader/SimpleHeader'
import toastConfig from '@/components/toast/toastConfig'
import { AuthProvider } from '@/src/contexts/AuthContext'
import { ThemeProvider } from '@/src/contexts/themeContext'
import { checkTokenValidity } from '@/src/services/authService'
import { navigateToLogin, navigateToPanelHome } from '@/utils/navigation'
import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { FiltersProvider } from '../contexts/filterContext'
import { AlanaProvider } from '../contexts/alanaContext'

export default function RootLayout() {
    return (
        <ThemeProvider>
            <AlanaProvider>
                <SafeAreaProvider style={styles.container}>
                        <AuthProvider>
                            <MainLayout />
                        </AuthProvider>
                        <Toast config={toastConfig} />
                </SafeAreaProvider>
            </AlanaProvider>
        </ThemeProvider>
    );
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
                    name="(panel)/PerfilCliente/page"
                    options={{ header: () => <SimpleHeader title="Perfil" backRoute={'/(panel)/home/page'} /> }}
                />
            <Stack.Screen
                name="(panel)/home/page"
                options={{ headerShown: false }}
                />

            <Stack.Screen
                name="(panel)/withdraw/page"
                options={{ headerShown: false }}
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
