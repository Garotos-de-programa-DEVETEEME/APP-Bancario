import api from './api'
import { getAuthHeader } from '@/utils/auth.utils'

// TODO: REMOVER DEPOIS QUE BACK ESTIVER PRONTO
import { mockConsultarListaFundosPMS } from '@/mock/pms-fundos.mock'

// --- Interfaces de Tipagem (Typescript) ---

/**
 * Define o formato dos dados cadastrais e operacionais de um ativo/fundo.
 */
export interface FundoPMS {
    id_Ativo: number
    id_Mercadoria: number
    ds_Nome_Completo: string
    ds_Nome_Reduzido: string
    nr_CNPJ: string // CNPJ (pode ser string vazia)
    dt_Constituicao: string // Formato ISO 8601 ou similar (ex: "AAAA-MM-DDTHH:MM:SS")
    id_Classificacao_CVM: number
    ds_Classificacao_CVM: string
    ds_Publico: string
    ds_Objetivo: string
    ds_Status_Aplicacao: 'Aberto para Aplicação' | string
    ds_Status_Resgate: 'Aberto para Resgate' | string
}

/**
 * A rota de fundos PMS retorna um array de FundoPMS.
 */
export type ListaFundosPMSResponse = FundoPMS[]

// --- Funções de Serviço ---

/**
 * Consulta a lista de fundos/ativos com seus dados cadastrais e status operacional.
 * @returns Uma Promise que resolve para um array de objetos FundoPMS.
 * @throws Lança um erro se a chamada à API falhar.
 */
export async function consultarListaFundosPMS(): Promise<ListaFundosPMSResponse> {
    try {
        // TODO: REMOVER DEPOIS QUE BACK ESTIVER PRONTO - CHAMADA MOCKADA
        const response = await mockConsultarListaFundosPMS()

        // const authHeader = await getAuthHeader()
        // const config = authHeader as { headers: { Authorization: string } }
        // const response = await api.get<ListaFundosPMSResponse>('/lista-fundos-pms', config)
        // return response.data

        return response
    } catch (error: any) {
        let errorMessage: string

        if (error.response) {
            errorMessage = error.response.data?.message || 'Erro ao consultar a lista de fundos PMS. Tente novamente.'
        } else if (error.request) {
            errorMessage = 'Erro de rede. Verifique sua conexão.'
        } else {
            errorMessage = error.message || 'Erro ao processar a requisição da lista de fundos.'
        }

        throw new Error(errorMessage)
    }
}
