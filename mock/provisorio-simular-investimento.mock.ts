import { SimulacaoResponse } from '@/services/provisorio-simular-fundo.service'

const MOCK_SIMULACAO_RESPONSE: SimulacaoResponse = {
            codigoFundo: 1,
            nomeReduzido: 'TESTE FCP',
            valorSaldoResgatavelAutomatico: 603409.33,
            valorSaldoResgatavelCliente: 0,
            valorMinimoResgateInternet: 0,
            horaLimiteAplicacaoResgate: '17:00',
            nome: 'BANESTES INV AUTOMATICO FI RENDA FIXA CP',
            permiteResgate: false,
            permiteAplicar: false,
            valorSaldoMinimoPermanencia: 0,
            valorInicialAplicacaoInternet: 100,
            valorMinimoAplicacaoInternet: 100,
            valorAplicacaoInicial: 100,
            horaLimite: 1700,
            taxaAdministracao: 1.7,
            fundoSimples: 'N',
            valorSimulacaoAplicacaoInicial: 5000,
            valorSimulacaoRetornoFinal: 5300,
            taxaSimulacaoEstimado: 1.5,
        }

/**
 * Simula uma chamada assíncrona para simular o investimento.
 * Simula um atraso de rede e retorna os dados mockados.
 */
export async function mockSimularResponse(): Promise<SimulacaoResponse> {
    console.log('[MOCK] Consultando a simulação do fundo (simulado)...')

    // Simula um atraso de rede (opcional, mas recomendado)
    await new Promise(resolve => setTimeout(resolve, 800)) // 800ms de atraso

    console.log('[MOCK] Simulação do fundo retornado com sucesso (simulado).')

    // Você pode adicionar lógica aqui para simular diferentes cenários,
    // como um erro se a rota for chamada sem um token (se necessário).

    return MOCK_SIMULACAO_RESPONSE
}
