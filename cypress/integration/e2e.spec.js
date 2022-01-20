/// <reference types="cypress" />
import LoginPage from '../support/pageObjects/login-po';


describe('Checkout end to end tests', () => {
  const uuid = () => Cypress._.random(0, 1e6)
  const id = uuid()
  const testname = `testname${id}`
  const username = testname
  const password = 'pa$$word'
  before('register a new user', () => {
    cy.request('POST', `${Cypress.env('backendBaseUrl')}/users/register`, { username: username, password: password }).then(
      (response) => {
        // response.body is automatically serialized into JSON
        if (!response.status === 200) {
          throw new Error("user was not registered")
        }

      }
    )
  })
  beforeEach(() => {
    // Go to base Url
    cy.visit('/')
    cy.intercept('GET', `${Cypress.env('backendBaseUrl')}/${username}/products`).as('getProducts')
    cy.login(username, password)

    //Example using PO

    // LoginPage.userName.type(username)
    // LoginPage.password.type(password)
    // LoginPage.loginButton.click()

    // wait for page loaded
    cy.wait('@getProducts')
  })

  it('verify empty card validation', () => {
    cy.selectOptionInMenu('Cart')
    cy.getCartMessage().should('have.text', 'OH NO YOUR CART IS EMPTY')
  })

  it('verify checkout flow', () => {
    // Intercept call to addProduct API and create an alias
    cy.intercept('POST', `${Cypress.env('backendBaseUrl')}/${username}/products/**`).as('addCard')
    cy.addItemsToCart(1, 2)
    // once a request to get settings responds, 'cy.wait' will resolve
    cy.wait('@addCard')
    // Verify for product added to cart
    cy.getConfirmMessage().should('have.text', 'Product Added to Cart')

    // Go to Cart
    cy.selectOptionInMenu('Cart')

    // Click on Buy! button
    cy.getCartMessage().contains('BUY!').click()

    // Verify the purchase has been successfully
    cy.getCheckoutConfirmation().contains('Thank you!').should('be.visible')
    // Acept dialog
    cy.getCartMessage().contains('Awesome').click()
    // Validate dialog is closed
    cy.getCartMessage().contains('Awesome').should('not.exist')
  })

  it('Test expecting to fail', () => {
    cy.intercept('POST', `${Cypress.env('backendBaseUrl')}/${username}/products/**`).as('addCard')
    cy.clickAddToCart(2)
    // once a request to get settings responds, 'cy.wait' will resolve
    cy.wait('@addCard')

    // Verify missing validation and show how the page breaks
    cy.getConfirmMessage().should('have.text', 'should add at least one product')
  })
})
