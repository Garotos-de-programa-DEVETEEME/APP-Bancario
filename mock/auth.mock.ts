import { LoginResponse } from '@/services/auth.service'

const MOCK_LOGIN_RESPONSE: LoginResponse = {
    token: 'mock-token-12345-dev',
    id: 999,
};

/**
 * Simula uma chamada de login assíncrona.
 * Simula sucesso ou falha com base no username/email.
 */
export async function mockSignIn(email: string, password: string): Promise<LoginResponse> {
    console.log(`[MOCK] Tentativa de login para: ${email}`);

    // 1. Simula um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1 segundo de atraso

    // 2. Lógica de sucesso/falha
    if (email === 'fail@mock.com' || password === 'wrong') {
        // Simula erro (Credenciais inválidas)
        console.error('[MOCK] Falha na autenticação (simulada).');
        // Deve lançar um objeto com a estrutura que o seu catch espera (opcional)

        throw {
            response: {
                data: {
                    message:
                        'Credenciais inválidas mockadas. Tente com user@mock.com.',
                },
            },
        }
    }

    // 3. Simula sucesso
    console.log('[MOCK] Autenticação bem-sucedida (simulada).');
    return MOCK_LOGIN_RESPONSE;
}

/**
 * Simula a verificação de validade do token.
 */
export async function mockCheckTokenValidity(): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('[MOCK] Verificação de token: Válido.');
    return true; // Token sempre válido no modo mock
}
