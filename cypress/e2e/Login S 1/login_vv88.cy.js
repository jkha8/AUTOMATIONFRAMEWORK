const { decrypt } = require('/Users/user/IdeaProjects/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

//const encryptedDomain = '2054e70bc0efc7e0a2089fbf2a8edbc7:a114159580946ff6e4259ac37e070900';
const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';
describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    //const domain = decrypt(encryptedDomain);
    const password = decrypt(encryptedPassword);
    cy.visit(`https://vivu88.com/`)
    cy.wait(3000)
    //cy.get('[alt="popup-deposit-bonus"]').click()
    //Close popup
    cy.get('.js-golden-hour-close-intro-modal > .w-full').click()
    cy.get('.mx-auto > .gap-\\[10px\\] > .text-neutral').click()
    cy.get('#username').type("sut17testvipkha")
    cy.get('#password').type(password)
    cy.wait(500)
    cy.get('#login-button').click()
  })
})
