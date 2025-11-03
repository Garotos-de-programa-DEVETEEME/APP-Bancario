import toastConfig from '@/components/toast/toastConfig'
import { checkTokenValidity } from '@/services/auth.service'
import { AuthProvider } from '@/src/contexts/AuthContext'
import { navigateToLogin, navigateToPanelHome } from '@/utils/navigation.utils'
import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

export default function RootLayout() {
    return (
        <SafeAreaProvider style={styles.container}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <AuthProvider>
                    <MainLayout />
                </AuthProvider>
                <Toast config={toastConfig} />
            </GestureHandlerRootView>
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
        </Stack>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
