
// TODO: REMOVER DEPOIS QUE BACK ESTIVER PRONTO

import { MOCK_USUARIO, mockConsultarUsuario } from "@/mock/perfilApi.dadosAvatar.mock"

// --- Interfaces de Tipagem (Typescript) ---

/**
 * Define o formato dos dados de cota diária de um fundo/carteira.
 */
export interface Usuario {
    id: number,
    nrConta: number,
    nrCpf: string,
    imageType: string,
    data: string,
    uploadDate: string,
    updatedAt: string,
    nomeUsuario: string,
    dateAvalicaoApp: null
}

/**
 * A rota de rentabilidade retorna um array de CotaDiaria.
 */
export type UserResponse = Usuario[]

// --- Funções de Serviço ---

/**
 * Consulta as informações diárias de cota e patrimônio de um fundo/carteira.
 * @returns Uma Promise que resolve para um array de objetos CotaDiaria.
 * @throws Lança um erro se a chamada à API falhar.
 */
export async function consultarRentabilidade(): Promise<UserResponse> {
    try {
        // TODO: REMOVER DEPOIS QUE BACK ESTIVER PRONTO - CHAMADA MOCKADA
        const response = await mockConsultarUsuario();

        // const authHeader = await getAuthHeader()
        // const config = authHeader as { headers: { Authorization: string } }
        // const response = await api.get<RentabilidadeResponse>('/rentabilidade', config)
        // return response.data

        return response
    } catch (error: any) {
        let errorMessage: string

        if (error.response) {
            errorMessage = error.response.data?.message || 'Erro ao consultar rentabilidade. Tente novamente.'
        } else if (error.request) {
            errorMessage = 'Erro de rede. Verifique sua conexão.'
        } else {
            errorMessage = error.message || 'Erro ao processar a requisição de rentabilidade.'
        }

        throw new Error(errorMessage)
    }
}
