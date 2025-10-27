import api from './api'
import { getAuthHeader } from '@/utils/auth.utils'

// TODO: REMOVER DEPOIS QUE BACK ESTIVER PRONTO
import { mockConsultarListaFundosAFA } from '@/mock/afa-fundos.mock'

// --- Interfaces de Tipagem (Typescript) ---

/**
 * Define o formato detalhado de um fundo de investimento na resposta AFA.
 */
export interface FundoAFA {
    // Identificação do Fundo
    codigo: number
    nome: string
    siglaFundo: string
    nomeReduzido: string
    historicoCodigo: number

    // Condições de Aplicação (Geral e Internet)
    identificadorAplicacao: 'S' | 'N' // 'S' para Sim, 'N' para Não
    identificadorAplicacaoInternet: 'S' | 'N'
    valorAplicacaoInicial: number
    valorInicialAplicacaoInternet: number
    valorMinimoAplicacaoInternet: number
    valorMaximoAplicado: number
    horaLimite: number // Formato HHMM
    horaLimiteAplicacaoInternet: number // Formato HHMM

    // Condições de Resgate e Permanência (Geral e Internet)
    identificadorResgatavel: 'S' | 'N'
    identificadorResgatavelInternet: 'S' | 'N'
    valorMinimoResgatavel: number
    valorMinimoResgateInternet: number
    valorMaximoResgatavel: number // 0 indica sem limite
    valorResgatavelDia: number // 0 indica sem limite
    valorResgatavelDiaInternet: number // 0 indica sem limite
    valorSaldoMinimo: number
    identificadorResgateAutomatico: 'S' | 'N' // 'N' no exemplo, mas tipado para S/N

    // Prazos e Datas
    prazoConversaoResgate: number // Dias úteis
    fundoPrazoCreditoConta: number // Dias úteis
    dataCarenciaResgate: string // Data (pode ser string vazia)
    dataCredito: string // Data (ex: "AAAA-MM-DD")
    dataEncerramento: string // Data (pode ser string vazia)

    // Características e Taxas
    taxaAdministracao: number // Percentual
    taxaRentabilidade: number
    tipoPessoa: 'A' | 'F' | 'J' // Ambos, Física, Jurídica
    identificadorRendaVariavel: 'S' | 'N'
    fundoSimples: 'S' | 'N'
    identificadorRestricaoFundos: number // Código de restrição
    possuiAplicacao: boolean
    possuiApi: boolean
}

/**
 * A rota de fundos AFA retorna um array de FundoAFA.
 */
export type ListaFundosAFAResponse = FundoAFA[]

// --- Funções de Serviço ---

/**
 * Consulta a lista de fundos com detalhes de condições de aplicação, resgate e taxas (DTVM/AFA).
 * @returns Uma Promise que resolve para um array de objetos FundoAFA.
 * @throws Lança um erro se a chamada à API falhar.
 */
export async function consultarListaFundosAFA(): Promise<ListaFundosAFAResponse> {
    try {
        // TODO: REMOVER DEPOIS QUE BACK ESTIVER PRONTO - CHAMADA MOCKADA
        const response = await mockConsultarListaFundosAFA()

        // const authHeader = await getAuthHeader()
        // const config = authHeader as { headers: { Authorization: string } }
        // const response = await api.get<ListaFundosAFAResponse>('/lista-fundos-afa', config)
        // return response.data

        return response
    } catch (error: any) {
        let errorMessage: string

        if (error.response) {
            errorMessage = error.response.data?.message || 'Erro ao consultar a lista de fundos AFA. Tente novamente.'
        } else if (error.request) {
            errorMessage = 'Erro de rede. Verifique sua conexão.'
        } else {
            errorMessage = error.message || 'Erro ao processar a requisição da lista de fundos AFA.'
        }

        throw new Error(errorMessage)
    }
}
