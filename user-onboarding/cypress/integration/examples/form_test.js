describe('Add a User App', () => {
    beforeEach(() => {
        cy.visit('localhost:3000')
    })


    it('sanity checks', () => {
        expect(3).to.equal(3)
        expect({}).to.eql({})
    })

    const nameInput = () => cy.get('input[name="name"]')
    const emailInput = () => cy.get('input[name="email"]')
    const passwordInput = () => cy.get('input[name="password"]')
    const tosBox = () => cy.get('input[name="terms"]')

    it('Filling out inputs', () => {
        nameInput()
            .should('exist')
            .should('have.value', '')
            .type('Kylee')
            .should('have.value', 'Kylee')

        emailInput()
            .should('exist')
            .type('k@kmail.com')

        passwordInput()
            .should('exist')
            .type('kyleeiskool')
    })

    it('Checking the terms of service box', () => {
        tosBox()
            .should('exist')
            .should('not.be.checked')
            .click()
            .should('be.checked')
    })
       


})