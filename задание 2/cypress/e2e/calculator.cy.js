describe('Калькулятор', () => {
    beforeEach(() => {
        cy.visit('index.html');
    });

    it('Проверяет сложение', () => {
        cy.get('.number').contains('2').click();
        cy.get('.operator').contains('+').click();
        cy.get('.number').contains('3').click();
        cy.get('.equals').click();
        cy.get('#display').should('have.value', '5');
    });

    it('Проверяет вычитание', () => {
        cy.get('.number').contains('7').click();
        cy.get('.operator').contains('-').click();
        cy.get('.number').contains('2').click();
        cy.get('.equals').click();
        cy.get('#display').should('have.value', '5');
    });

    it('Проверяет умножение', () => {
        cy.get('.number').contains('4').click();
        cy.get('.operator').contains('*').click();
        cy.get('.number').contains('5').click();
        cy.get('.equals').click();
        cy.get('#display').should('have.value', '20');
    });

    it('Проверяет деление', () => {
        cy.get('.number').contains('8').click();
        cy.get('.operator').contains('/').click();
        cy.get('.number').contains('2').click();
        cy.get('.equals').click();
        cy.get('#display').should('have.value', '4');
    });

    it('Проверяет очистку (C)', () => {
        cy.get('.number').contains('1').click();
        cy.get('.number').contains('2').click();
        cy.get('.operator').contains('+').click();
        cy.get('.number').contains('3').click();
        cy.get('.operator').contains('C').click();
        cy.get('#display').should('have.value', '0');
    });

    it('Проверяет цепочку операций', () => {
        cy.get('.number').contains('2').click();
        cy.get('.operator').contains('+').click();
        cy.get('.number').contains('3').click();
        cy.get('.operator').contains('*').click();
        cy.get('.number').contains('4').click();
        cy.get('.equals').click();
        cy.get('#display').should('have.value', '20'); 
    });
});