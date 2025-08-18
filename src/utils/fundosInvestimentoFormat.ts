//codigo para converter fundsType para FundosInvestimento
//TODO procurar outra forma de fazer isso na tipagem do fundo;

import { fundsType } from "../@Types/fundos";
import { FundosInvestidos } from "../@Types/fundosInvestidos";
import { converterNumeroParaHora as hourFormat } from "./hourFormat";

const cores = [
    { nome: 'BANESTES INVEST FACIL FI RF SIMPLES', cor: '#33609A' },
    { nome: 'BANESTES VIP DI FIC RENDA FIXA REF DI', cor: '#4C9AFE' },
    { nome: 'BANESTES VITORIA 500 FIC RF REF DI', cor: '#318535' },
    { nome: 'BANESTES INSTITUCIONAL FI RENDA FIXA', cor: '##FF96BC' },
];//TODO adicionar uma cor por fundo existente (total de 15)

const addColor = (nomeFundo: string): string => {
    return (cores.find(e => e.nome === nomeFundo)?.cor || '#A79F9F');
}

export const FormatarFundosInvestimento = (funds: fundsType[]):FundosInvestidos[] => {
    return funds.map(fundo => ({
        nomeFundo: fundo.nome,
        tipoFUndo: fundo.siglaFundo,
        valorInvestido: fundo.valorAplicacaoInicial,//TODO alterar para valor correto
        cor: addColor(fundo.nome),
        saldoResgateAutomativco: fundo.valorResgatavelDia,//TODO conferir se é esse campo correto
        valorMinimoResgate: fundo.valorMinimoResgatavel,
        horarioLImiteResgate: hourFormat(fundo.horaLimiteAplicacaoInternet),
    }));
}

