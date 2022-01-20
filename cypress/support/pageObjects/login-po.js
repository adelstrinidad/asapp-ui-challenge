class LoginPage {

    get userName() {
        return cy.get('#username');
    }
    get password() {
        return cy.get('#password');
    }
    get loginButton() {
        return cy.contains('Log In');
    }

}
export default new LoginPage