import routes from '@/constants/routes';
import { FundoDetalhe } from '@/services/fundos.service';
import { Href, router } from 'expo-router';

/**
 * Navega para home (pós-login).
 */
export function navigateToPanelHome() {
    router.replace(routes.HOME_PANEL as Href);
}

/**
 * Navega para a tela de login (tela inicial).
 */
export function navigateToLogin() {
    router.replace(routes.LOGIN as Href);
}

/**
 * Navega para a tela de investimento (listagem de fundos).
 */
export function navigateToFundosLista() {
    router.push(routes.FUNDO_LISTA as Href);
}

/**
 * Navega para a tela de investir de um fundo específico.
 */
export function navigateToInvestir(fund: FundoDetalhe) {
    router.push({
        pathname: routes.FUNDO_INVESTIR,
        params: { fundData: JSON.stringify(fund) },
    } as Href);
}

/**
 * Navega para a tela de 'Saiba Mais' de um fundo específico.
 */
export function navigateToSaibaMais(fund: FundoDetalhe) {
    router.push({
        pathname: routes.FUNDO_SAIBA_MAIS,
        params: { fundData: JSON.stringify(fund) },
    } as Href);
}

/**
 * Navega para a tela de simulação (listagem de fundos).
 */
export function navigateToSimulacaoLista() {
    router.push(routes.SIMULACAO_LISTA as Href);
}

/**
 * Navega para a tela de simulação (fundo específico).
 */
export function navigateToSimulacao(fund: FundoDetalhe) {
    router.push({
        pathname: routes.SIMULACAO_DETALHE,
        params: { fundData: JSON.stringify(fund) },
    } as Href);
}