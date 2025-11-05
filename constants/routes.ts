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
    WITHDRAW: '/(panel)/withdraw/page',
    //TODO: colocar rota da página inicial de investir quando for adicionada (FUNDO_LISTA ?)
    FUNDO_INVESTIR: '/(panel)/home/page', //TODO: colocar página certa quando for adicionada
    FUNDO_SAIBA_MAIS: '/(panel)/home/page', //TODO: colocar página certa quando for adicionada
    SIMULACAO_LISTA: '/(panel)/simular-investimento/page',
    SIMULACAO_DETALHE: '/(panel)/simular-investimento/simulacao',
};
export default routes;
