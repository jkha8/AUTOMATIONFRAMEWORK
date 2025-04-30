describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    cy.visit('https://qc.nhat9.vip/')
    const brand = 'nhat9';
    const randomStringAccount = `sut17${brand.toLowerCase()}${Math.random().toString(36).substring(2,10)}`
    cy.log(randomStringAccount)
    cy.get('#usrname').type(randomStringAccount)
    cy.get('#pwd').type("Kha6868@")
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
      password: "Kha6868@"
    };
    cy.task('saveUserDataToFileG',userDataG);
    cy.log('User data saved:', JSON.stringify(userDataG));

  })
})
