describe('My First Test', function () {
  it('Verify title of the page - Positive', function () {
    cy.visit('https://demo.nopcommerce.com/');
    cy.title().should('eq', 'nomCommerce demo store');
  });

  it('Verify title of the page - Negative', function () {
    cy.visit('https://demo.nopcommerce.com/');
    cy.title().should('eq', 'nomCommerrce demo store');
  });
});
