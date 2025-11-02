import { RentabilidadeResponse } from '@/services/rentabilidade.service'

const MOCK_RENTABILIDADE_RESPONSE: RentabilidadeResponse = [
    {
        id_Carteira: 35,
        nr_CpfCnpj: '20230719000126',
        dt_Cota: '11/09/2024 00:00:00',
        vl_Cota: 2.4587358415,
        vl_PL_Fechamento: '3348747023,99', // Mantendo como string conforme o mock original
        vl_Var_Dia: 0,
        vl_Var_Acum: 0,
    },
    {
        id_Carteira: 35,
        nr_CpfCnpj: '20230719000126',
        dt_Cota: '12/09/2024 00:00:00',
        vl_Cota: 2.4598761039,
        vl_PL_Fechamento: '3424143321,3',
        vl_Var_Dia: 0.04637596,
        vl_Var_Acum: 0.04637596,
    },
    {
        id_Carteira: 35,
        nr_CpfCnpj: '20230719000126',
        dt_Cota: '13/09/2024 00:00:00',
        vl_Cota: 2.4609009853,
        vl_PL_Fechamento: '3379387979,12',
        vl_Var_Dia: 0.04166394,
        vl_Var_Acum: 0.08805923,
    },
    {
        id_Carteira: 35,
        nr_CpfCnpj: '20230719000126',
        dt_Cota: '16/09/2024 00:00:00',
        vl_Cota: 2.4618042098,
        vl_PL_Fechamento: '3373273502,63',
        vl_Var_Dia: 0.036703,
        vl_Var_Acum: 0.12479455,
    },
]

/**
 * Simula uma chamada assíncrona para consultar os dados de rentabilidade.
 * Simula um atraso de rede e retorna os dados mockados.
 */
export async function mockConsultarRentabilidade(): Promise<RentabilidadeResponse> {
    console.log('[MOCK] Consultando dados de rentabilidade (simulado)...')

    // Simula um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 700)) // 700ms de atraso

    console.log('[MOCK] Dados de rentabilidade retornados com sucesso (simulado).')

    return MOCK_RENTABILIDADE_RESPONSE
}
