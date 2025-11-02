import { ListaFundosPMSResponse } from '@/services/pms-fundos.service'

const MOCK_LISTA_FUNDOS_PMS_RESPONSE: ListaFundosPMSResponse = [
    {
        ds_Nome_Completo: 'IT4 Finance',
        ds_Nome_Reduzido: 'IT4 Finance',
        dt_Constituicao: '2018-12-31T00:00:00',
        id_Ativo: 11,
        id_Mercadoria: 15069,
        ds_Publico: '',
        ds_Status_Aplicacao: 'Aberto para Aplicação',
        ds_Status_Resgate: 'Aberto para Resgate',
        id_Classificacao_CVM: 0,
        ds_Classificacao_CVM: '',
        nr_CNPJ: '',
        ds_Objetivo: '',
    },
    {
        ds_Nome_Completo: 'RB Capital Vitória Fundo Incentivado de Investimento em Infraestrutura Renda Fixa',
        ds_Nome_Reduzido: 'RB Capital Vitória FII Infraestrutura RF',
        dt_Constituicao: '2017-05-03T00:00:00',
        id_Ativo: 11,
        id_Mercadoria: 15033,
        ds_Publico: '',
        ds_Status_Aplicacao: 'Aberto para Aplicação',
        ds_Status_Resgate: 'Aberto para Resgate',
        id_Classificacao_CVM: 3,
        ds_Classificacao_CVM: 'Renda Fixa',
        nr_CNPJ: '26751126000191',
        ds_Objetivo: '',
    },
    {
        ds_Nome_Completo: 'Banestes Liquidez FIF Renda Fixa Referenciado DI Responsabilidade Limitada',
        ds_Nome_Reduzido: 'Banestes Liquidez',
        dt_Constituicao: '2014-04-23T00:00:00',
        id_Ativo: 11,
        id_Mercadoria: 15034,
        ds_Publico: '',
        ds_Status_Aplicacao: 'Aberto para Aplicação',
        ds_Status_Resgate: 'Aberto para Resgate',
        id_Classificacao_CVM: 3,
        ds_Classificacao_CVM: 'Renda Fixa',
        nr_CNPJ: '20230719000126',
        ds_Objetivo: '',
    },
    {
        ds_Nome_Completo: 'b',
        ds_Nome_Reduzido: 'B',
        dt_Constituicao: '2003-02-21T00:00:00',
        id_Ativo: 11,
        id_Mercadoria: 15035,
        ds_Publico: '',
        ds_Status_Aplicacao: 'Aberto para Aplicação',
        ds_Status_Resgate: 'Aberto para Resgate',
        id_Classificacao_CVM: 0,
        ds_Classificacao_CVM: '',
        nr_CNPJ: '',
        ds_Objetivo: '',
    },
    {
        ds_Nome_Completo: 'Banestes IRF-M 1 Titulos Publicos FIF Renda Fixa Responsabilidade Limitada',
        ds_Nome_Reduzido: 'Banestes IRF-M1',
        dt_Constituicao: '2014-08-22T00:00:00',
        id_Ativo: 11,
        id_Mercadoria: 15036,
        ds_Publico: '',
        ds_Status_Aplicacao: 'Aberto para Aplicação',
        ds_Status_Resgate: 'Aberto para Resgate',
        id_Classificacao_CVM: 3,
        ds_Classificacao_CVM: 'Renda Fixa',
        nr_CNPJ: '21005667000157',
        ds_Objetivo: '',
    },
]

/**
 * Simula uma chamada assíncrona para consultar a lista de fundos PMS.
 * Simula um atraso de rede e retorna os dados mockados.
 */
export async function mockConsultarListaFundosPMS(): Promise<ListaFundosPMSResponse> {
    console.log('[MOCK] Consultando lista de fundos PMS (simulado)...')

    // Simula um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 600)) // 600ms de atraso

    console.log('[MOCK] Lista de fundos PMS retornada com sucesso (simulado).')

    // Você pode adicionar lógica aqui para simular listas vazias ou erros
    // if (Math.random() < 0.1) { /* simular erro */ }

    return MOCK_LISTA_FUNDOS_PMS_RESPONSE
}
