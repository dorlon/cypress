/// <reference types = "cypress"/>
//Created by: Dor Bitton
describe('My First Test', function () {
  before('Set automation to Customer Feedback page', () => {
    cy.visit('https://juice-shop.herokuapp.com/');
    cy.get('mat-icon').contains('menu').click();
    cy.contains(' Customer Feedback ').click();
  });
  it('Check label form', function () {
    cy.get('h1').then(($text) => {
      expect($text).to.contain('Customer Feedback');
    });
  }); //Set up Juice-Shop, open menu and navigate to Customer Feedback page

  it('Check form background color', function () {
    cy.get('.mat-card.mat-focus-indicator.mat-elevation-z6').should(($el) => {
      expect($el.css('background')).to.equal(
        'rgb(66, 66, 66) none repeat scroll 0% 0% / auto padding-box border-box'
      );
    });
  }); //Check background color of topic

  describe('Author', function () {
    it('Check title Author', function () {
      cy.get('[for=mat-input-1]').then(($title) => {
        expect($title).to.contain('Author');
      });
    });

    it('Check input of Author field', function () {
      cy.get('#mat-input-1')
        .should('have.value', 'anonymous')
        .invoke('val')
        .then((value) => {
          expect(value).to.equal('anonymous');
        });
    });

    it('Check if Author is disabled', function () {
      cy.get('#mat-input-1')
        .invoke('prop', 'disabled')
        .then((checkField) => {
          expect(checkField).to.be.true;
        });
    });
  });

  describe('Comment', function () {
    it('Check title Comments *', function () {
      cy.get('[for=comment]')
        .invoke('text')
        .then((title) => {
          expect(title).to.contain('Comment *');
        });
    });
    it('Check color field', function () {
      cy.get('[for=comment]')
        .invoke('css', 'color')
        .then((color) => {
          expect(color).to.equal('rgba(255, 255, 255, 0.7)');
        });
    });

    it('Check string max characters', function () {
      cy.get('#mat-hint-0')
        .invoke('text')
        .then((maxCharText) => {
          expect(maxCharText).to.equal('Max. 160 characters');
        });
    });

    it('Check the limit characters', function () {
      cy.get('#mat-hint-1')
        .invoke('text')
        .then((limit) => {
          expect(limit).to.equal('0/160');
        });
    });

    it('Press Comment field, check string placeholder', function () {
      cy.get('#comment').focus().click();
      cy.get('#comment')
        .invoke('attr', 'placeholder')
        .then((placeholder) => {
          expect(placeholder).to.equal('What did you like or dislike?');
        });
    });

    describe('Check errors Comment', function () {
      it('Check title Comments *', function () {
        cy.get('[for=comment]')
          .invoke('text')
          .then((title) => {
            expect(title).to.contain('Comment *');
          });
      });
      it('Check error string color', function () {
        cy.get('#feedback-form').click();
        cy.get('#mat-error-0')
          .invoke('css', 'color')
          .then((color) => {
            expect(color).to.equal('rgb(255, 87, 34)');
          });
      });

      it('Check error string', function () {
        cy.get('#mat-error-0')
          .invoke('text')
          .then((limit) => {
            expect(limit).to.equal('Please provide a comment. ');
          });
      });
    });

    describe('Type a string', function () {
      it('Type a string in Comment field', function () {
        cy.get('#comment').type('Hello World');
        cy.get('#comment').then(($value) => {
          expect($value.val()).to.contain('Hello World');
        });
      });
      it('Check string max characters in string', function () {
        cy.get('#mat-hint-0')
          .invoke('text')
          .then((maxCharText) => {
            expect(maxCharText).to.equal('Max. 160 characters');
          });
      });

      it('Check the NEW limit characters', function () {
        cy.get('#mat-hint-1')
          .invoke('text')
          .then((limit) => {
            expect(limit).to.equal('11/160');
          });
      });
    });

    describe('Drag the Comment field', function () {
      it('Drag the table down', function () {
        cy.get('#comment')
          .invoke('attr', 'style', 'height: 100px;')
          .then(($textarea) => {
            expect($textarea.attr('style')).to.eq('height: 100px;');
          });
      });
    });
  });

  describe('Rating', function () {
    it('Verify label Rating', function () {
      cy.get('.rating-container')
        .invoke('text')
        .then((title) => {
          expect(title).to.contain('Rating');
        });
    });
    it('Check slider line', function () {
      cy.get('.mat-slider-track-wrapper').then(($el) => {
        expect($el).to.exist;
      });
    });
    it('Check slider-thumb', function () {
      cy.get('.mat-slider-thumb').then(($el) => {
        expect($el).to.exist;
      });
    });

    it('Check max rating', function () {
      cy.get('#rating').then(($el) => {
        expect($el.attr('max')).to.equal('5');
      });
    });

    it('Check min rating', function () {
      cy.get('#rating').then(($el) => {
        expect($el.attr('min')).to.equal('1');
      });
    });

    it('Move the slider to 5★', function () {
      cy.get('.mat-slider-thumb-container')
        .first()
        .invoke('attr', 'style', `transform: translateX(0%)`);
      cy.get('.mat-slider-thumb').click();
      cy.get('#rating').then(($el) => {
        expect($el.attr('aria-valuetext')).to.equal('5★');
      });
    });

    it('Check color slider', function () {
      cy.get('.mat-slider-track-fill')
        .invoke('css', 'background-color')
        .then((color) => {
          expect(color).to.equal('rgb(104, 159, 56)');
        });
    });
  });

  describe('CAPTCHA and Result', function () {
    it('Verify label CAPTCHA', function () {
      cy.get('label').then(($text) => {
        expect($text).to.contain('CAPTCHA:');
      });
    });

    it('Verify words- What is', function () {
      cy.get('span').then(($text) => {
        expect($text).to.contain('What is');
      });
    });

    it('Check title Result *', function () {
      cy.get('[for=captchaControl]')
        .invoke('text')
        .then((text) => {
          expect(text).to.equal('Result *');
        });
    });

    it('Verify placeholder Result', function () {
      cy.get('#captchaControl').focus().click();
      cy.get('#captchaControl')
        .invoke('attr', 'placeholder')
        .then((placeholder) => {
          expect(placeholder).to.equal(
            'Please enter the result of the CAPTCHA.'
          );
        });
    });

    describe('Check Result error', function () {
      it('check error string of Result', function () {
        cy.get('#comment').click();
        cy.get('#mat-error-1')
          .invoke('text')
          .then((limit) => {
            expect(limit).to.equal('Please enter the result of the CAPTCHA. ');
          });
      });

      it('Check Result error color', function () {
        cy.get('#feedback-form').click();
        cy.get('#mat-form-field-label-7')
          .invoke('css', 'color')
          .then((color) => {
            expect(color).to.equal('rgb(104, 159, 56)');
          });
      });
    });

    describe('Calculate', function () {
      it('Calculate the CAPTCHA', function () {
        cy.get('#captcha').then(($captcha) => {
          const math_string = $captcha.text();
          const math_result = eval(math_string);
          cy.get('#captchaControl').type(math_result);
          expect(math_result).to.be.a('number');
        });
      });
    });
  });

  describe('Submit', function () {
    it('Check signal button', function () {
      cy.get('.material-icons')
        .invoke('text')
        .then((title) => {
          expect(title).to.contain(' send ');
        });
    });

    it('Check Submit string', function () {
      cy.get('.mat-button-wrapper')
        .invoke('text')
        .then((title) => {
          expect(title).to.contain(' Submit ');
        });
    });

    it('Check color button', function () {
      cy.get('#submitButton')
        .invoke('css', 'background-color')
        .then((color) => {
          expect(color).to.equal('rgba(84, 110, 122, 0.992)');
        });
    });
  });

  describe('Submit message', function () {
    it('Check submit message', function () {
      cy.get('#submitButton').click();
      cy.get('.mat-simple-snack-bar-content')
        .invoke('text')
        .then((limit) => {
          expect(limit).to.equal(
            'Thank you so much for your amazing 5-star feedback!'
          );
        });
    });

    it('Check X sign', function () {
      cy.get('.mat-button-wrapper')
        .contains('X')
        .first()
        .invoke('text')
        .then((text) => {
          expect(text).to.equal('X');
        });
    });
  });
});
