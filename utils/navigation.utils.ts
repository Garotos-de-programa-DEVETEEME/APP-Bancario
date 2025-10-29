import routes from '@/constants/routes';
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
