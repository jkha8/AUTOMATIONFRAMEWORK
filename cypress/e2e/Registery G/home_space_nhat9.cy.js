const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = 'c71eb0423477bcb923a2d5d8b02a70ea:5ce9985d77886b670fb55a43c028088a';
const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';
describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    const domain = decrypt(encryptedDomain);
    const password = decrypt(encryptedPassword);
    cy.visit(`https://${domain}`) 
    const brand = 'nhat9';
    const randomStringAccount = `sut17${brand.toLowerCase()}${Math.random().toString(36).substring(2,10)}`
    cy.log(randomStringAccount)
    cy.get('#usrname').type(randomStringAccount)
    cy.get('#pwd').type(password)
    cy.solveCaptchaSmart({
      retries: 3,
      captchaImgSelector: '.recaptcha-bg',
      captchaInputSelector: '#captcha',
      submitButtonSelector: '.btnsubmit > img',
      refreshButtonSelector: '.capcha_icon',
      closeNotificationButtonSelector: '.close > img'
    });
    //.btnsubmit > img
    //cy.solveCaptcha('.recaptcha-bg', '#captcha');
    //cy.get('.recaptcha-bg') 
    //cy.get('#captcha')
    //cy.get('.capcha_icon')
    //cy.get('button > img').click()
    //.close > img
    //"Captcha không hợp lệ." cy.get('.modal-body')
   
    // cy.wait(5000)
    // cy.origin('https://domain', () => {
    //   cy.url().should('include', 'i.o.w');
    // });

    const userDataG = {
      account: randomStringAccount,
      password: encryptedPassword
    };
    cy.task('saveUserDataToFileG',userDataG);
    cy.log('User data saved:', JSON.stringify(userDataG));

  })
})
