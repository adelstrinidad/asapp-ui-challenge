// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('waitForLoadingHome', (username) => {
    cy.intercept('GET', `http://localhost:5000/${username}/products`).as('getProducts')
    cy.wait('@getProducts')
})

Cypress.Commands.add('selectOptionInMenu', (option) => {
    cy.fixture('home').then((homeElements) => {
        cy.get(homeElements.tabList).find(homeElements.muiTabWrapper).contains(option).click(0)

    })
})

Cypress.Commands.add('getConfirmMessage', () => {
    cy.fixture('home').then((homeElements) => {
        return cy.get(homeElements.confirmMessage)

    })
})

Cypress.Commands.add('addItemsToCart', (qty, productIndex) => {
    cy.fixture('home').then((homeElements) => {
        cy.get(homeElements.listBox).eq(productIndex).click()
        cy.get(`[data-value=\"${qty}\"]`).click()
        cy.get(homeElements.addToCartButton).eq(productIndex).click()

    })

})

Cypress.Commands.add('clickAddToCart', (productIndex) => {
    cy.fixture('home').then((homeElements) => {
        cy.get(homeElements.addToCartButton).eq(productIndex).click()

    })
})