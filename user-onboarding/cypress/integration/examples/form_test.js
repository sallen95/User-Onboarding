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
    const submitBtn = () => cy.get('#submitButton')

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
            .click()
    })

    it('The user can submit the form data', () => {
        nameInput().type('hello')
        emailInput().type('world@gmail.com')
        passwordInput().type('foobar')
        tosBox().click()
        submitBtn().click()
        nameInput().should('have.value', '')
        emailInput().should('have.value', '')
        passwordInput().should('have.value', '')
        tosBox().should('not.be.checked')
    })

    it('Form validation if name input is left empty', () => {
        emailInput().type('world@gmail.com')
        passwordInput().type('foobar')
        tosBox().click()
        submitBtn().should('be.disabled')
    })
       


})