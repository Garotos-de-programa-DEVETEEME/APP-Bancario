import { Href, router } from 'expo-router'
import routes from '@/constants/routes'
import { navigate } from 'expo-router/build/global-state/routing';

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
 * Navega para o perfil do usuário.
*/
export function navigateToProfile() {
    router.replace(routes.PROFILE_PANEL as Href);
}

/**
 * Navega para a tela de simulação.
*/
export function navigateToSimular() {
    router.replace(routes.SIMULAR_PANEL as Href);
}

/**
 * Navega para a tela de fundos de investimento.
*/
export function navigateToFundosInvestimento() {
    router.replace(routes.FUNDOS_INVESTIMENTO_PANEL as Href);
}

/**
 * Navega para a tela de carteira.
*/
export function navigateToWallet() {
    router.replace(routes.WALLET_PANEL as Href);
}
