class demoblazePage {
  login(userName, password) {
    cy.get('#login2').click();
    cy.wait(1000);
    cy.get('#loginusername').type(userName);
    cy.get('#loginpassword').type(password);
    return cy.get('button[onclick="logIn()"]').click();
  }
  placeOrder(name, country, city, creditCard, month, year) {
    cy.contains('Place Order').click();
    cy.wait(1000);
    cy.get('#name').type(name);
    cy.get('#country').type(country);
    cy.get('#city').type(city);
    cy.get('#card').type(creditCard);
    cy.get('#month').type(month);
    cy.get('#year').type(year);
    cy.contains('Purchase').click();
  }
}
export default demoblazePage;
