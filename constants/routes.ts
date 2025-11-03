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
    PROFILE_PANEL: '/(panel)/profile/page',
    FUNDO_LISTA: '/(panel)/investir-fundos/page',
    FUNDO_INVESTIR: '/(panel)/investir-fundos/investimento',
    FUNDO_SAIBA_MAIS: '/(panel)/investir-fundos/saiba-mais',
    SIMULACAO_LISTA: '/(panel)/simular-investimento/page',
    SIMULACAO_DETALHE: '/(panel)/simular-investimento/simulacao',
};
export default routes;
