import { BaseScreen } from '@/components/BaseScreen/BaseScreen'
import { ScreenStates } from '@/components/BaseScreen/ScreenStates'
import colors from '@/constants/colors'
import { signIn } from '@/src/services/authService'
import { useState } from 'react'
import {
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

export default function Login() {
    const [screenState, setScreenState] = useState(ScreenStates.content())
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = async () => {
        try {
            if (!email || !password) {
                Toast.show({
                    type: 'error',
                    text1: 'Erro de login',
                    text2: 'Por favor, preencha todos os campos.',
                })
                return
            }

            setScreenState(ScreenStates.loading())
            await signIn(email, password)
        } catch (error) {
            setScreenState(ScreenStates.content())
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Falha desconhecida no login.'

            Toast.show({
                type: 'error',
                text1: 'Erro de login',
                text2: errorMessage,
            })
        }
    }

    return (
        BaseScreen({
            state: screenState,
            children: (
            <ImageBackground
                source={require('../../assets/images/home/banestes-home.jpg')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.container}>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                placeholder="Digite seu email..."
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                testID="login-input-email"
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>Senha</Text>
                            <TextInput
                                placeholder="Digite sua senha..."
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                testID="login-input-senha"
                            />
                        </View>

                        <Pressable
                            style={styles.button}
                            onPress={handleSignIn}
                            testID="login-botao-entrar"
                        >
                            <Text style={styles.buttonText}>Entrar</Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
            </ImageBackground>)
        })
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors.zinc,
    },
    form: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 24,
        paddingHorizontal: 14,
    },
    label: {
        color: colors.zinc,
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 8,
        paddingVertical: 14,
    },
    button: {
        backgroundColor: colors.zinc,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 8,
        marginBottom: 20,
    },
    buttonText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 16,
        textAlign: 'center',
        marginBottom: 30,
    },
})
