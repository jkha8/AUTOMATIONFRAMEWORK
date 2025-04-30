describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    cy.visit('https://lp.zo10.win/')
    cy.wait(2000)
    const brand = 'zo10';
    const randomStringAccount = `sut17${brand.toLowerCase()}${Math.random().toString(36).substring(2,10)}`
    cy.log(randomStringAccount)
    cy.get('#usrname').type(randomStringAccount)
    cy.get('#pwd').type("Kha6868@")
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
    // cy.origin('https://i.zo10.win', () => {
    //   cy.url().should('include', 'i.zo10.win');
    // });

    const userDataG = {
      account: randomStringAccount,
      password: "Kha6868@"
    };
    cy.task('saveUserDataToFileG',userDataG);
    cy.log('User data saved:', JSON.stringify(userDataG));

  })
})
