import { ListaFundosAFAResponse } from '@/services/afa-fundos.service'

const MOCK_LISTA_FUNDOS_AFA_RESPONSE: ListaFundosAFAResponse = [
    {
        identificadorAplicacaoInternet: 'S',
        valorInicialAplicacaoInternet: 1,
        valorMinimoAplicacaoInternet: 1,
        valorMinimoResgateInternet: 1,
        horaLimiteAplicacaoInternet: 1700,
        valorResgatavelDiaInternet: 0,
        identificadorResgatavelInternet: 'S',
        codigo: 28,
        nome: 'BANESTES INVEST FACIL FI RF SIMPLES',
        siglaFundo: 'FBS',
        nomeReduzido: 'INVEST FACIL SIMPLES',
        identificadorRestricaoFundos: 1,
        fundoPrazoCreditoConta: 0,
        prazoConversaoResgate: 0,
        valorMinimoResgatavel: 1,
        valorAplicacaoInicial: 1,
        valorMaximoAplicado: 1,
        valorMaximoResgatavel: 0,
        identificadorResgateAutomatico: 'N',
        taxaRentabilidade: 1.164384,
        historicoCodigo: 3602,
        valorSaldoMinimo: 0,
        tipoPessoa: 'A',
        identificadorRendaVariavel: 'N',
        horaLimite: 1700,
        identificadorAplicacao: 'S',
        identificadorResgatavel: 'S',
        valorResgatavelDia: 0,
        taxaAdministracao: 2.5,
        possuiAplicacao: false,
        fundoSimples: 'S',
        possuiApi: true,
        dataCarenciaResgate: '',
        dataCredito: '2025-05-05',
        dataEncerramento: '',
    },
    {
        identificadorAplicacaoInternet: 'S',
        valorInicialAplicacaoInternet: 5000,
        valorMinimoAplicacaoInternet: 100,
        valorMinimoResgateInternet: 100,
        horaLimiteAplicacaoInternet: 1700,
        valorResgatavelDiaInternet: 0,
        identificadorResgatavelInternet: 'S',
        codigo: 4,
        nome: 'BANESTES VIP DI FIC RENDA FIXA REF DI',
        siglaFundo: 'VIP',
        nomeReduzido: 'VIP DI FIC RF REF DI',
        identificadorRestricaoFundos: 4,
        fundoPrazoCreditoConta: 0,
        prazoConversaoResgate: 0,
        valorMinimoResgatavel: 100,
        valorAplicacaoInicial: 5000,
        valorMaximoAplicado: 5000,
        valorMaximoResgatavel: 0,
        identificadorResgateAutomatico: 'N',
        taxaRentabilidade: 0.002972,
        historicoCodigo: 324,
        valorSaldoMinimo: 500,
        tipoPessoa: 'A',
        identificadorRendaVariavel: 'N',
        horaLimite: 1700,
        identificadorAplicacao: 'S',
        identificadorResgatavel: 'S',
        valorResgatavelDia: 0,
        taxaAdministracao: 0.8,
        possuiAplicacao: true,
        fundoSimples: 'N',
        possuiApi: true,
        dataCarenciaResgate: '',
        dataCredito: '2025-05-05',
        dataEncerramento: '',
    },
]

/**
 * Simula uma chamada assíncrona para consultar a lista de fundos AFA.
 * Simula um atraso de rede e retorna os dados mockados.
 */
export async function mockConsultarListaFundosAFA(): Promise<ListaFundosAFAResponse> {
    console.log('[MOCK] Consultando lista de fundos AFA (simulado)...')

    // Simula um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 900)) // 900ms de atraso

    console.log('[MOCK] Lista de fundos AFA retornada com sucesso (simulado).')

    return MOCK_LISTA_FUNDOS_AFA_RESPONSE
}
