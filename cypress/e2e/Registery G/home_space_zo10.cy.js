const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = '5ed88689406e221ad9d014672f610514:d20c568e5b8d80a020f30f6cc5142774';
const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';
describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    const domain = decrypt(encryptedDomain);
    const password = decrypt(encryptedPassword);
    cy.visit(`https://${domain}`) 
    cy.wait(2000)
    const brand = 'zo10';
    const randomStringAccount = `sut17${brand.toLowerCase()}${Math.random().toString(36).substring(2,10)}`
    cy.log(randomStringAccount)
    cy.get('#usrname').type(randomStringAccount)
    cy.get('#pwd').type(password)
    cy.solveCaptchaSmart({
      captchaImgSelector: '.recaptcha-bg',
      captchaInputSelector: '#captcha',
      submitButtonSelector: '.btnsubmit > img',
      waitAfterSubmit: 5000
    });
    //.btnsubmit > img
    //cy.solveCaptcha('.recaptcha-bg', '#captcha');
    //cy.get('.recaptcha-bg') 
    //cy.get('#captcha')
    //cy.get('.capcha_icon')
    //cy.get('button > img').click()
    //.close > img
    //"Captcha không hợp lệ." cy.get('.modal-body')
   
    // cy.wait(1000)
    // cy.origin('https://', () => {
    //   cy.url().should('include', '');
    // });

    const userDataG = {
      account: randomStringAccount,
      password: encryptedPassword
    };
    cy.task('saveUserDataToFileG',userDataG);
    cy.log('User data saved:', JSON.stringify(userDataG));

  })
})
