import api from './api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAuthHeader } from '@/utils/auth.utils'
import { navigateToLogin, navigateToPanelHome } from '@/utils/navigation.utils'

//TODO: REMOVER DEPOIS QUE BACK ESTIVER PRONTO
import { mockSignIn } from '@/mock/auth.mock'

export interface LoginResponse {
    token: string
    id: number
}

/**
 * Realiza a chamada de login e armazena o token e ID do usuário.
 * @param email - O email (username) do usuário.
 * @param password - A senha do usuário.
 * @returns Um objeto contendo 'token' e 'id' em caso de sucesso.
 * @throws Lança um erro se a chamada à API falhar.
 */
export async function signIn(email: string, password: string): Promise<LoginResponse> {
    try {
        //TODO: REMOVER DEPOIS QUE BACK ESTIVER PRONTO - DADOS MOCKADOS
        const response = await mockSignIn(email, password);
        const { token, id } = response;

        // const response = await api.post<LoginResponse>('/session', { username: email, password });
        // const { token, id } = response.data;

        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userId', id.toString());

        navigateToPanelHome();

        return { token, id };

    } catch (error: any) {
        let errorMessage: string;

        if (error.response) {
            errorMessage = error.response.data?.message || 'Credenciais inválidas. Tente novamente.';
        } else if (error.request) {
            errorMessage = 'Erro de rede. Verifique sua conexão.';
        } else {
            errorMessage = error.message || 'Erro ao processar a requisição.';
        }

        throw new Error(errorMessage);
    }
}

/**
 * Remove os dados de sessão do armazenamento local.
 */
export async function signOut(): Promise<void> {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userId');
    navigateToLogin();
}

/**
 * Verifica a validade do token de autenticação atual na API.
 * @returns Uma Promise que resolve para true se o token for válido, e false caso contrário.
 */
export async function checkTokenValidity(): Promise<boolean> {
    try {
        const authHeader = await getAuthHeader();

        if (!authHeader) {
            return false;
        }

        const config: { headers: { Authorization: string } } = authHeader as { headers: { Authorization: string } };

        const response = await api.get('/verifica-token', config);

        return response.status >= 200 && response.status < 300;

    } catch (e: any) {
        console.error('Falha na verificação do token:', e.response?.status || e.message);

        await signOut();

        return false;
    }
}
