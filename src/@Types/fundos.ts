// dados temporarios para a criação do componente

export type fundsType = {
  identificadorAplicacaoInternet: string //booleano
  valorInicialAplicacaoInternet: number
  valorMinimoAplicacaoInternet: number
  valorMinimoResgateInternet: number
  horaLimiteAplicacaoInternet: number
  valorResgatavelDiaInternet: number
  identificadorResgatavelInternet: string //booleano
  codigo: number
  nome: string
  siglaFundo: string
  nomeReduzido: string
  identificadorRestricaoFundos: number
  fundoPrazoCreditoConta: number
  prazoConversaoResgate: number
  valorMinimoResgatavel: number
  valorAplicacaoInicial: number
  valorMaximoAplicado: number
  valorMaximoResgatavel: number
  identificadorResgateAutomatico: string //boolean
  taxaRentabilidade: number
  historicoCodigo: number
  valorSaldoMinimo: number
  tipoPessoa: string
  identificadorRendaVariavel: string
  horaLimite: number
  identificadorAplicacao: string
  identificadorResgatavel: string
  valorResgatavelDia: number
  taxaAdministracao: number
  possuiAplicacao: boolean
  fundoSimples: string
  possuiApi: boolean
  dataCarenciaResgate: string
  dataCredito: '2025-05-05'
  dataEncerramento: string
}

//excluir daqui para baixo
export const tempFunds: fundsType[] = [
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
  {
    identificadorAplicacaoInternet: 'S',
    valorInicialAplicacaoInternet: 500,
    valorMinimoAplicacaoInternet: 100,
    valorMinimoResgateInternet: 100,
    horaLimiteAplicacaoInternet: 1700,
    valorResgatavelDiaInternet: 0,
    identificadorResgatavelInternet: 'S',
    codigo: 6,
    nome: 'BANESTES VITORIA 500 FIC RF REF DI',
    siglaFundo: 'GIR',
    nomeReduzido: 'VITORIA 500 FIC RF',
    identificadorRestricaoFundos: 6,
    fundoPrazoCreditoConta: 0,
    prazoConversaoResgate: 0,
    valorMinimoResgatavel: 100,
    valorAplicacaoInicial: 500,
    valorMaximoAplicado: 500,
    valorMaximoResgatavel: 0,
    identificadorResgateAutomatico: 'N',
    taxaRentabilidade: 0.002973,
    historicoCodigo: 3116,
    valorSaldoMinimo: 250,
    tipoPessoa: 'A',
    identificadorRendaVariavel: 'N',
    horaLimite: 1700,
    identificadorAplicacao: 'S',
    identificadorResgatavel: 'S',
    valorResgatavelDia: 0,
    taxaAdministracao: 1.5,
    possuiAplicacao: false,
    fundoSimples: 'N',
    possuiApi: true,
    dataCarenciaResgate: '',
    dataCredito: '2025-05-05',
    dataEncerramento: '',
  },
]
