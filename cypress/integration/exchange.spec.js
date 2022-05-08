describe('Home page', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('displays ten exchanges', () => {
      cy.get('.exchanges ul').should('have.length', 10)
    })

    it('should navigate to a new page when user clicks on an exchange', () => {
        cy.get('.exchanges ul').first().click()
        cy.url().should('include', '/exchange/')
    })
})

describe('Exchange page', () => {
    beforeEach(() => {
        // this assumes binance is included in the first 10 exchanges returned by Coingecko API
        cy.visit('/exchange/binance')
    })

    it('includes a button that can go back to home page', () => {
        cy.get('button').click()
        cy.url().should('eq', 'http://localhost:3000/')
    })

});