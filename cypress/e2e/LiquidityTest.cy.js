/// <reference types = "cypress"/>
//Created by: Dor Bitton
describe('My First Test', function () {
  before('Set automation to Customer Feedback page', () => {
    cy.visit('https://juice-shop.herokuapp.com/');
    cy.get('mat-icon').contains('menu').click();
    cy.contains(' Customer Feedback ').click();
  }); //Set the test from home page to Customer Feedback

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
    }); //Check writen title field of Author

    it('Check input of Author field', function () {
      cy.get('#mat-input-1')
        .should('have.value', 'anonymous')
        .invoke('val')
        .then((value) => {
          expect(value).to.equal('anonymous');
        });
    }); //Check the input field of Author

    it('Check if Author is disabled', function () {
      cy.get('#mat-input-1')
        .invoke('prop', 'disabled')
        .then((checkField) => {
          expect(checkField).to.be.true;
        });
    }); //Check the field Author is disabled to edit
  }); //Author field tests

  describe('Comment', function () {
    it('Check title Comments *', function () {
      cy.get('[for=comment]')
        .invoke('text')
        .then((title) => {
          expect(title).to.contain('Comment *');
        });
    }); //Check writen title field of Comment

    it('Check string max characters', function () {
      cy.get('#mat-hint-0')
        .invoke('text')
        .then((maxCharText) => {
          expect(maxCharText).to.equal('Max. 160 characters');
        });
    }); //Check info message: Max length characters to be write in Comment field

    it('Check the limit characters', function () {
      cy.get('#mat-hint-1')
        .invoke('text')
        .then((limit) => {
          expect(limit).to.equal('0/160');
        });
    }); //Check the default limit characters to write

    it('Press Comment field, check string placeholder', function () {
      cy.get('#comment').focus().click();
      cy.get('#comment')
        .invoke('attr', 'placeholder')
        .then((placeholder) => {
          expect(placeholder).to.equal('What did you like or dislike?');
        });
    }); //Check placeholder of Comment field

    describe('Check errors Comment', function () {
      it('Check title Comments *', function () {
        cy.get('[for=comment]')
          .invoke('text')
          .then((title) => {
            expect(title).to.contain('Comment *');
          });
      }); //Check the label of the Comment field
      it('Check error string color', function () {
        cy.get('#feedback-form').click();
        cy.get('#mat-error-0')
          .invoke('css', 'color')
          .then((color) => {
            expect(color).to.equal('rgb(255, 87, 34)');
          });
      }); //Check error color label string - orange

      it('Check error string', function () {
        cy.get('#mat-error-0')
          .invoke('text')
          .then((limit) => {
            expect(limit).to.equal('Please provide a comment. ');
          });
      }); //Check error message of Comment field
    }); //Comment errors tests

    describe('Type a string', function () {
      it('Type a string in Comment field', function () {
        cy.get('#comment').type('Hello World');
        cy.get('#comment').then(($value) => {
          expect($value.val()).to.contain('Hello World');
        });
      }); //Type string in Comment filed

      it('Check if Submit is disabled', function () {
        cy.get('#submitButton')
          .invoke('prop', 'disabled')
          .then((checkField) => {
            expect(checkField).to.be.true;
          });
      }); //After filling Comment field, checking submit if it's disabled

      it('Check color border', function () {
        cy.get(
          '.mat-form-field-outline.mat-form-field-outline-thick.ng-tns-c118-10.ng-star-inserted'
        )
          .invoke('css', 'color')
          .then((color) => {
            expect(color).to.equal('rgb(104, 159, 56)');
          });
      }); //Check color border of Comment - green

      it('Check string max characters in string', function () {
        cy.get('#mat-hint-0')
          .invoke('text')
          .then((maxCharText) => {
            expect(maxCharText).to.equal('Max. 160 characters');
          });
      }); //Check if info Max characters is still appear

      it('Check the NEW limit characters', function () {
        cy.get('#mat-hint-1')
          .invoke('text')
          .then((limit) => {
            expect(limit).to.equal('11/160');
          });
      }); //Check limit characters left to be written
    }); //tests of typing Comment

    describe('Drag the Comment field', function () {
      it('Drag the table down', function () {
        cy.get('#comment')
          .invoke('attr', 'style', 'height: 100px;')
          .then(($textarea) => {
            expect($textarea.attr('style')).to.eq('height: 100px;');
          });
      }); //Enlarging the Comment field, and check the height
    }); //Enlarging the Comment field
  }); //Comment tests

  describe('Rating', function () {
    it('Verify label Rating', function () {
      cy.get('.rating-container')
        .invoke('text')
        .then((title) => {
          expect(title).to.contain('Rating');
        });
    }); //Check writen title field of
    it('Check slider line', function () {
      cy.get('.mat-slider-track-wrapper').then(($el) => {
        expect($el).to.exist;
      });
    }); //Check line slider is exist
    it('Check slider-thumb', function () {
      cy.get('.mat-slider-thumb').then(($el) => {
        expect($el).to.exist;
      });
    }); //Check thumb-slider is exist

    it('Check max rating', function () {
      cy.get('#rating').then(($el) => {
        expect($el.attr('max')).to.equal('5');
      });
    }); //Check max number rating

    it('Check min rating', function () {
      cy.get('#rating').then(($el) => {
        expect($el.attr('min')).to.equal('1');
      });
    }); //Check min number rating

    it('Move the slider to 5★', function () {
      cy.get('.mat-slider-thumb-container')
        .first()
        .invoke('attr', 'style', `transform: translateX(0%)`);
      cy.get('.mat-slider-thumb').click();
      cy.get('#rating').then(($el) => {
        expect($el.attr('aria-valuetext')).to.equal('5★');
      });
    }); //Rating the thumb-slider to 5★

    it('Check color slider', function () {
      cy.get('.mat-slider-track-fill')
        .invoke('css', 'background-color')
        .then((color) => {
          expect(color).to.equal('rgb(104, 159, 56)');
        });
    }); //Check color rating slider

    it('Check if Submit is disabled', function () {
      cy.get('#submitButton')
        .invoke('prop', 'disabled')
        .then((checkField) => {
          expect(checkField).to.be.true;
        });
    }); //Check if Submit is disabled
  }); //Rating tests
  let math_result;
  describe('CAPTCHA and Result', function () {
    it('Verify label CAPTCHA', function () {
      cy.get('label').then(($text) => {
        expect($text).to.contain('CAPTCHA:');
      });
    }); //Check the string 'CAPTCHA:'

    it('Verify words- What is', function () {
      cy.get('span').then(($text) => {
        expect($text).to.contain('What is');
      });
    }); //Check the string 'What is'

    it('Verify - ?', function () {
      cy.get('label').then(($text) => {
        expect($text).to.contain('?');
      });
    }); //Check the string '?'

    it('Check title Result *', function () {
      cy.get('[for=captchaControl]')
        .invoke('text')
        .then((text) => {
          expect(text).to.equal('Result *');
        });
    }); //Check writen title field of 'Result *'

    it('Verify placeholder Result', function () {
      cy.get('#captchaControl').focus().click();
      cy.get('#captchaControl')
        .invoke('attr', 'placeholder')
        .then((placeholder) => {
          expect(placeholder).to.equal(
            'Please enter the result of the CAPTCHA.'
          );
        });
    }); //Check placeholder of Result field

    describe('Check Result error', function () {
      it('check error string of Result', function () {
        cy.get('#comment').click();
        cy.get('#mat-error-1')
          .invoke('text')
          .then((limit) => {
            expect(limit).to.equal('Please enter the result of the CAPTCHA. ');
          });
      }); //Check error message of Result field

      it('Check Result error color of Result', function () {
        cy.get('#feedback-form').click();
        cy.get('#mat-form-field-label-7')
          .invoke('css', 'color')
          .then((color) => {
            expect(color).to.equal('rgb(104, 159, 56)');
          });
      }); //Check color error of Result field
    }); //Result errors tests

    describe('Calculate', function () {
      it('Calculate the CAPTCHA', function () {
        cy.get('#captcha').then(($captcha) => {
          const math_string = $captcha.text();
          math_result = eval(math_string);
          cy.get('#captchaControl').type(math_result);
          expect(math_result).to.be.a('number');
        });
      }); //Calculate the CAPTCHA ridle

      it('Check color border of Result', function () {
        cy.get(
          '.mat-form-field-outline.mat-form-field-outline-thick.ng-tns-c118-11.ng-star-inserted'
        )
          .invoke('css', 'color')
          .then((color) => {
            expect(color).to.equal('rgb(104, 159, 56)');
          });
      }); //Check the color border of Result after typing - green

      it('Check if Submit is able', function () {
        cy.get('#submitButton')
          .invoke('prop', 'disabled')
          .then((checkField) => {
            expect(checkField).to.be.false;
          });
      }); //Check Submit is able to select
    }); //Calculate tests
  }); //CAPTCHA and Result tests

  describe('Submit', function () {
    it('Check signal button', function () {
      cy.get('.material-icons')
        .invoke('text')
        .then((title) => {
          expect(title).to.contain(' send ');
        });
    }); //Check the icon button of Submit

    it('Check Submit string', function () {
      cy.get('.mat-button-wrapper')
        .invoke('text')
        .then((title) => {
          expect(title).to.contain(' Submit ');
        });
    }); //Check the string button of Submit

    it('Check color button', function () {
      cy.get('#submitButton')
        .invoke('css', 'background-color')
        .then((color) => {
          expect(color).to.equal('rgba(84, 110, 122, 0.992)');
        });
    }); //Check the background-color button of Submit
  }); //Submit button tests

  let star;

  describe('Check submit works perfectly', function () {
    it('Type wrong result and check if submit is disable', function () {
      if (math_result != 5) {
        cy.get('#captcha').then(($captcha) => {
          cy.get('#captchaControl').clear();
          cy.get('#captchaControl').type(5);
        });
      } else {
        cy.get('#captchaControl').clear();
        cy.get('#captchaControl').type(3);
      }
      cy.get('#submitButton')
        .invoke('prop', 'disabled')
        .then((checkField) => {
          expect(checkField).to.be.false;
        });
    }); //Type wrong answer of Result, check submit button is unclickable

    it('Calculate the CAPTCHA', function () {
      cy.get('#captchaControl').clear();
      cy.get('#captcha').then(($captcha) => {
        const math_string = $captcha.text();
        math_result = eval(math_string);
        cy.get('#captchaControl').type(math_result);
        expect(math_result).to.be.a('number');
      });
    }); //Calculate the right Result

    it('Clear Comment field, check Submit is disabled', function () {
      cy.get('#comment').clear();
      cy.get('#submitButton')
        .invoke('prop', 'disabled')
        .then((checkField) => {
          expect(checkField).to.be.true;
        });
    }); //Clear Comment field, to check if Comment is mandatory to submit

    it('Type string in Comment field', function () {
      cy.get('#comment').type('Hello new World');
      cy.get('#comment').then(($value) => {
        expect($value.val()).to.contain('Hello new World');
      });
    }); //Type new Comment

    it('Clear Comment and Result, check Submit is Disable', function () {
      cy.get('#comment').clear();
      cy.get('#captchaControl').clear();
      cy.get('#submitButton')
        .invoke('prop', 'disabled')
        .then((checkField) => {
          expect(checkField).to.be.true;
        });
    }); //Clear Comment and Result, to check if they are mandatory to submit

    it('Type string in Comment field', function () {
      cy.get('#comment').type('Hello World');
      cy.get('#comment').then(($value) => {
        expect($value.val()).to.contain('Hello World');
      });
    }); //Type new comment

    it('Calculate the CAPTCHA', function () {
      cy.get('#captchaControl').clear();
      cy.get('#captcha').then(($captcha) => {
        const math_string = $captcha.text();
        math_result = eval(math_string);
        cy.get('#captchaControl').type(math_result);
        expect(math_result).to.be.a('number');
      });
    }); //Calculate the right Result

    it('Move the slider to 1★, check Submit is still able', function () {
      cy.get('.mat-slider-thumb-container')
        .first()
        .invoke('attr', 'style', `transform: translateX(-100%)`);
      cy.get('.mat-slider-thumb').click();
      cy.get('#submitButton')
        .invoke('prop', 'disabled')
        .then((checkField) => {
          expect(checkField).to.be.false;
        });
    }); //Move the slider to the lowest rating to check if Submit is still clickable
  }); //Check events of not-completing the topic

  describe('Submit message', function () {
    it('Check submit message', function () {
      cy.get('#submitButton').click();
      if (star == '5★') {
        cy.get('.mat-simple-snack-bar-content')
          .invoke('text')
          .then((limit) => {
            expect(limit).to.equal(
              'Thank you so much for your amazing 5-star feedback!'
            );
          });
      } else {
        cy.get('.mat-simple-snack-bar-content')
          .invoke('text')
          .then((limit) => {
            expect(limit).to.equal('Thank you for your feedback.');
          });
      }
    }); //Check cases of strings in the pop-up

    it('Check X sign', function () {
      cy.get('.mat-button-wrapper')
        .contains('X')
        .first()
        .invoke('text')
        .then((text) => {
          expect(text).to.equal('X');
        });
    }); //Check close pop-up is exists
  }); //tests of pop-up "topic sent"
});
