describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    cy.visit('https://lp.sun.win/')
    const brand = 'sunwin';
    const randomStringAccount = `sut17${brand.toLowerCase()}${Math.random().toString(36).substring(2,10)}`
    cy.log(randomStringAccount)
    cy.get('#usrname').type(randomStringAccount)
    cy.get('#pwd').type("Kha6868@")
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
      password: "Kha6868@"
    };
    cy.task('saveUserDataToFileG',userDataG);
    cy.log('User data saved:', JSON.stringify(userDataG));

  })
})
