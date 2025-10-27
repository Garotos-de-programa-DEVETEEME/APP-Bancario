import api from './api'
import { getAuthHeader } from '@/utils/auth.utils'

// TODO: REMOVER DEPOIS QUE BACK ESTIVER PRONTO
import { mockConsultarRentabilidade } from '@/mock/rentabilidade.mock'

// --- Interfaces de Tipagem (Typescript) ---

/**
 * Define o formato dos dados de cota diária de um fundo/carteira.
 */
export interface CotaDiaria {
    id_Carteira: number
    nr_CpfCnpj: string
    dt_Cota: string // Formato: "DD/MM/AAAA HH:MM:SS"
    vl_Cota: number
    // vl_PL_Fechamento está vindo como string, mas representa um valor monetário
    vl_PL_Fechamento: string
    vl_Var_Dia: number // Variação percentual do dia
    vl_Var_Acum: number // Variação percentual acumulada
}

/**
 * A rota de rentabilidade retorna um array de CotaDiaria.
 */
export type RentabilidadeResponse = CotaDiaria[]

// --- Funções de Serviço ---

/**
 * Consulta as informações diárias de cota e patrimônio de um fundo/carteira.
 * @returns Uma Promise que resolve para um array de objetos CotaDiaria.
 * @throws Lança um erro se a chamada à API falhar.
 */
export async function consultarRentabilidade(): Promise<RentabilidadeResponse> {
    try {
        // TODO: REMOVER DEPOIS QUE BACK ESTIVER PRONTO - CHAMADA MOCKADA
        const response = await mockConsultarRentabilidade()

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
