export interface FundoInvestimento {
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