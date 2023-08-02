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

const PDFExtract = require('pdf-text-extract');

Cypress.Commands.add('comparePdfText', (file1, file2) => {
  const extractPdfText = (fileContent) => {
    return new Promise((resolve) => {
      PDFExtract(fileContent, (err, data) => {
        if (err) {
          resolve({ text: '' }); // Resolve with an empty object in case of error
        } else {
          resolve(data);
        }
      });
    });
  };

  const decodeBinaryToText = (binaryData) => {
    const uint8Array = new Uint8Array(binaryData);
    const text = new TextDecoder('utf-8').decode(uint8Array);
    return text;
  };

  cy.readFile(file1, 'binary').then((fileContent1) => {
    cy.readFile(file2, 'binary').then((fileContent2) => {
      cy.log(fileContent1);
      cy.log(fileContent2);
      extractPdfText(fileContent1).then((data1) => {
        extractPdfText(fileContent2).then((data2) => {
          const text1 = decodeBinaryToText(data1.text); // Convert binary to text
          const text2 = decodeBinaryToText(data2.text); // Convert binary to text
          expect(text1).to.equal(text2);
        });
      });
    });
  });
});

Cypress.Commands.add('selectProduct', (productName) => {
  cy.get('h4.card-title').each(($el, index, $list) => {
    if ($el.text().includes(productName)) {
      cy.get('button.btn.btn-info').eq(index).click();
    }
  });
});

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
