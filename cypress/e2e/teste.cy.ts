describe('Teste de Login Bem-Sucedido', () => {
    it('deve logar com sucesso e navegar para a home', function() {
        cy.visit('/')

        // Ação de Login
        cy.get('[data-testid="login-input-email"]').click();
        cy.get('[data-testid="login-input-email"]').type('user1');
        cy.get('[data-testid="login-input-senha"]').click();
        cy.get('[data-testid="login-input-senha"]').type('senha123');
        cy.get('[data-testid="login-botao-entrar"]').click();

        // ASSERT (Verifica a URL)
        // Confirma se a URL contém o path '/home' após o login
        cy.url().should('include', '/home');
    });
});
