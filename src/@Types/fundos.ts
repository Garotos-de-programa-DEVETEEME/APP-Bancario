// Interface de fundos para o mock
export interface FundoInvestimento {
  identificadorAplicacaoInternet: string;
  valorInicialAplicacaoInternet: number;
  valorMinimoAplicacaoInternet: number;
  valorMinimoResgateInternet: number;
  horaLimiteAplicacaoInternet: number;
  valorResgatavelDiaInternet: number;
  identificadorResgatavelInternet: string;
  codigo: number;
  nome: string;
  siglaFundo: string;
  nomeReduzido: string;
  identificadorRestricaoFundos: number;
  fundoPrazoCreditoConta: number;
  prazoConversaoResgate: number;
  valorMinimoResgatavel: number;
  valorAplicacaoInicial: number;
  valorMaximoAplicado: number;
  valorMaximoResgatavel: number;
  identificadorResgateAutomatico: string;
  taxaRentabilidade: number;
  historicoCodigo: number;
  valorSaldoMinimo: number;
  tipoPessoa: string;
  identificadorRendaVariavel: string;
  horaLimite: number;
  identificadorAplicacao: string;
  identificadorResgatavel: string;
  valorResgatavelDia: number;
  taxaAdministracao: number;
  possuiAplicacao: boolean;
  fundoSimples: string;
  possuiApi: boolean;
  dataCarenciaResgate: string;
  dataCredito: string;
  dataEncerramento: string;
}
