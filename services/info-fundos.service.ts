import api from './api'
import { getAuthHeader } from '@/utils/auth.utils'

// TODO: REMOVER DEPOIS QUE BACK ESTIVER PRONTO
import { mockConsultarInfoFundos } from '@/mock/info-fundos.mock'

// --- Interfaces de Tipagem (Typescript) ---

// Auxiliares
export interface AtributoTributacao {
    titulo: string
    descricao: string
}

export interface AliquotaTributacao {
    prazo: string
    aliquotaBasica: string
    aliquotaComplementar: string
    total: string
}

export interface TabelaRegressiva {
    descricao: string
    aliquotas: AliquotaTributacao[]
}

export interface Documento {
    titulo: string
    url: string
}

export interface Comunicado {
    data: string
    titulo: string
    url: string
}

// Seções Principais
export interface Caracteristicas {
    classificacaoRisco: string
    classificacaoCVM: string
    subclasseCVM: string
    tipoANBIMA: string
}

export interface CondicoesComerciais {
    aplicacaoInicial: string
    investimentoAdicionalMinimo: string
    resgateMinimo: string
    saldoMinimoPermanencia: string
    tipoCota: string
    carencia: string
    cotaAplicacao: string
    cotaResgate: string
    debitoContaCorrente: string
    creditoContaCorrente: string
    horarioLimite: string
}

export interface Taxas {
    // Notei que o campo pode ser 'taxaGlobal' ou 'taxaAdministracao' no seu JSON.
    // Usaremos 'taxaGlobal' como obrigatório, e mantemos os outros.
    taxaGlobal?: string
    taxaAdministracao?: string
    taxaPerformance: string
    taxaIngresso: string
    taxaSaida: string
}

export interface PrestadoresServicos {
    administradorFiduciario: string
    gestorRecursos: string
    tesourariaControleProcessamento: string
    escrituracaoEmissaoResgate: string
    custodiaAtivosFinanceiros: string
    distribuicaoCotas: string
    auditorIndependente: string
}

export interface Tributacao {
    iof: AtributoTributacao
    ir: AtributoTributacao
    tabelaLongoPrazo: TabelaRegressiva | null // Pode ser null
    tabelaCurtoPrazo: TabelaRegressiva | null // Pode ser null
    observacao: string | null // Pode ser null
}


/**
 * Define o formato detalhado de um único fundo de investimento.
 */
export interface FundoDetalhado {
    id: string
    nomeCompleto: string
    descricaoCurta: string
    publicoAlvo: string
    objetivo: string
    politicaInvestimento: string
    caracteristicas: Caracteristicas
    condicoesComerciais: CondicoesComerciais
    taxas: Taxas
    prestadoresServicos: PrestadoresServicos
    tributacao: Tributacao
    documentos: Documento[]
    comunicados: Comunicado[]
}

/**
 * Define o formato da resposta completa da API (array de fundos).
 */
export interface InfoFundosResponse {
    fundos: FundoDetalhado[]
}

// --- Funções de Serviço ---

/**
 * Consulta informações detalhadas sobre os fundos de investimento.
 * @returns Uma Promise que resolve para o objeto InfoFundosResponse.
 * @throws Lança um erro se a chamada à API falhar.
 */
export async function consultarInfoFundos(): Promise<InfoFundosResponse> {
    try {
        // TODO: REMOVER DEPOIS QUE BACK ESTIVER PRONTO - CHAMADA MOCKADA
        const response = await mockConsultarInfoFundos()

        // const authHeader = await getAuthHeader()
        // const config = authHeader as { headers: { Authorization: string } }
        // const response = await api.get<InfoFundosResponse>('/info-fundos', config)
        // return response.data

        return response
    } catch (error: any) {
        let errorMessage: string

        if (error.response) {
            errorMessage = error.response.data?.message || 'Erro ao consultar informações dos fundos. Tente novamente.'
        } else if (error.request) {
            errorMessage = 'Erro de rede. Verifique sua conexão.'
        } else {
            errorMessage = error.message || 'Erro ao processar a requisição de informações de fundos.'
        }

        throw new Error(errorMessage)
    }
}
