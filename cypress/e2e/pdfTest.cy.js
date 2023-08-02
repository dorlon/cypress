/// <reference types = "cypress"/>

describe('PDF Text Comparison', () => {
  it('should assert true if the texts of two PDF files are the same', () => {
    const pdfFilePath1 =
      'C:/Users/dorbi/OneDrive/Desktop/Cypress Automation/cypress/e2e/PDFs/equal1.pdf'; // Replace this with the actual path to the first PDF file
    const pdfFilePath2 =
      'C:/Users/dorbi/OneDrive/Desktop/Cypress Automation/cypress/e2e/PDFs/equal2.pdf'; // Replace this with the actual path to the second PDF file

    cy.comparePdfText(pdfFilePath1, pdfFilePath2);
  });
});
