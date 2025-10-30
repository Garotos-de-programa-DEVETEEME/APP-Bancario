/**
 * Arquivo simples para centralizar todas as strings de rotas do aplicativo.
 * Use estas constantes em vez de digitar os caminhos diretamente em 'router.replace()'.
 */

interface Routes {
    [key: string]: string;
}
const routes: Routes = {
    LOGIN: '/',
    HOME_PANEL: '/(panel)/home/page',
    PROFILE_PANEL: '/(panel)/PerfilCliente/page',
    WALLET_PANEL: '',
    FUNDOS_INVESTIMENTO_PANEL: '',
    SIMULAR_PANEL: '',
};
export default routes;
