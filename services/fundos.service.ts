import api from './api'
import { getAuthHeader } from '@/utils/auth.utils'

// TODO: REMOVER DEPOIS QUE BACK ESTIVER PRONTO
import { mockConsultarSaldo } from '@/mock/fundos.mock'

// --- Interfaces de Tipagem (Typescript) ---

/**
 * Define o formato dos dados detalhados de um fundo.
 */
export interface FundoDetalhe {
    codigoFundo: number
    nomeReduzido: string
    valorSaldoResgatavelAutomatico: number
    valorSaldoResgatavelCliente: number
    valorMinimoResgateInternet: number
    horaLimiteAplicacaoResgate: string
    nome: string
    permiteResgate: boolean
    permiteAplicar: boolean
    valorSaldoMinimoPermanencia: number
    valorInicialAplicacaoInternet: number
    valorMinimoAplicacaoInternet: number
    valorAplicacaoInicial: number
    horaLimite: number // Formato HHMM
    taxaAdministracao: number // Percentual
    fundoSimples: 'S' | 'N'
    taxaRentabilidade: number
    tipoFundo: string
    classificacaoRisco: string
    cotizacaoResgate: string
    liquidacaoResgate: string
    classificacaoCVM: string
    subclasseCVM: string
    tipoANBIMA: string
}

/**
 * Define o formato da resposta completa da consulta de saldo.
 */
export interface SaldoResponse {
    totalGeral: number
    listaFundos: FundoDetalhe[]
}

// --- Funções de Serviço ---

/**
 * Consulta o saldo consolidado de um cliente em fundos de investimento.
 * @returns Uma Promise que resolve para o objeto SaldoResponse.
 * @throws Lança um erro se a chamada à API falhar.
 */
export async function consultarSaldo(): Promise<SaldoResponse> {
    try {
        // TODO: REMOVER DEPOIS QUE BACK ESTIVER PRONTO - CHAMADA MOCKADA
        const response = await mockConsultarSaldo()

        // const authHeader = await getAuthHeader()
        // const config = authHeader as { headers: { Authorization: string } }
        // const response = await api.get<SaldoResponse>('/consultar-saldo', config)
        // return response.data

        return response
    } catch (error: any) {
        // O tratamento de erro pode ser ajustado conforme a sua necessidade
        let errorMessage: string

        if (error.response) {
            errorMessage = error.response.data?.message || 'Erro ao consultar saldo. Tente novamente.'
        } else if (error.request) {
            errorMessage = 'Erro de rede. Verifique sua conexão.'
        } else {
            errorMessage = error.message || 'Erro ao processar a requisição de saldo.'
        }

        throw new Error(errorMessage)
    }
}