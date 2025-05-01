const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = 'fb0333765f1501cedce59384f86efdb4:4771ef12282a6f720a6149e0a2d9673f';
const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';
describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    const domain = decrypt(encryptedDomain);
    const password = decrypt(encryptedPassword);
    cy.visit(`https://${domain}`) 
    const brand = 'sunwin';
    const randomStringAccount = `sut17${brand.toLowerCase()}${Math.random().toString(36).substring(2,10)}`
    cy.log(randomStringAccount)
    cy.get('#usrname').type(randomStringAccount)
    cy.get('#pwd').type(password)
    cy.solveCaptchaSmart({
      captchaImgSelector: '.recaptcha-bg',
      captchaInputSelector: '#captcha',
      submitButtonSelector: 'button > img',
      waitAfterSubmit: 5000
      //refreshButtonSelector: '.capcha_icon',
      //closeNotificationButtonSelector: '.closealert > img'
    });
    //cy.get('.closealert > img') //close thông báo
    //cy.solveCaptcha('.recaptcha-bg', '#captcha');
    //cy.get('.recaptcha-bg')
    //cy.get('#captcha')
    //cy.get('.capcha_icon')
    //cy.get('button > img').click()
   
    // cy.wait(5000)
    // cy.origin('https://...', () => {
    //   cy.url().should('include', '....');
    // });

    const userDataG = {
      account: randomStringAccount,
      password: encryptedPassword
    };
    cy.task('saveUserDataToFileG',userDataG);
    cy.log('User data saved:', JSON.stringify(userDataG));

  })
})
