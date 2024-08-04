describe('Application', function () {
  beforeEach(() => {
    cy.intercept('GET', 'ingredients', { fixture: 'ingredients' });
    cy.intercept('POST', 'login', { fixture: 'login' });
    let email = '123456@test.com';
    let password = '123456';

    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
  });

  it('should show Ингредиент 1 after click on 1st element', () => {
    cy.get('[data-testid="bun"]').first().click();
    cy.get('[data-testid="ingredient-name"]').should('have.text', 'Ингредиент 1');
  });

  it('should close modal after click close button', () => {
    cy.get('[data-testid="bun"]').first().click();
    cy.get('[data-testid="ingredient-name"]').should('have.text', 'Ингредиент 1');
    cy.get('[data-testid="modal-close-button"]').click();
    cy.get('[data-testid="ingredient-name"]').should('not.exist');
  });

  it('should close modal after click overlay', () => {
    cy.get('[data-testid="bun"]').first().click();
    cy.get('[data-testid="ingredient-name"]').should('have.text', 'Ингредиент 1');
    cy.get('[data-testid="modal-overlay"]').click('left', { force: true });
    cy.get('[data-testid="ingredient-name"]').should('not.exist');
  });

  it('should drop on drop-target', () => {
    cy.get('[data-testid="bun"]').trigger('dragstart');
    cy.get('[data-testid="drop-target"]').trigger('drop');
    cy.get('[data-testid="drop-target"]').should('have.text', 'Ингредиент 1 (вверх)1255');
  });

  it('should create order', () => {
    cy.intercept('POST', 'orders', { fixture: 'orders' });
    cy.get('[data-testid="bun"]').trigger('dragstart');
    cy.get('[data-testid="drop-target"]').trigger('drop');
    cy.get('[data-testid="sauce"]').trigger('dragstart');
    cy.get('[data-testid="drop-target"]').trigger('drop');
    cy.contains('Оформить заказ').click();
    cy.get('[data-testid="order-number"]').should('have.text', '1');
  });
});
