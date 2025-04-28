describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    cy.visit('https://lp.tipclub.win/')
    const PREFIX = 'sut17'; // 5 ký tự
    const BRAND = 'tip';   // 3 ký tự
    const RANDOM_LENGTH = 12 - (PREFIX.length + BRAND.length); // 4 ký tự
    const randomStringAccount = `${PREFIX}${BRAND.toLowerCase()}${Math.random().toString(36).substring(2, 2 + RANDOM_LENGTH)}`;
    cy.log(randomStringAccount)
    cy.get('#usrname').type(randomStringAccount)
    cy.get('#pwd').type("Kha6868@")
    cy.get('picture > img').click()
    cy.wait(5000)
    cy.origin('https://play.tipclub.win', () => {
      cy.url().should('include', 'play.tipclub.win');
    });

    const userDataG = {
      account: randomStringAccount,
      password: "Kha6868@"
    };
    cy.task('saveUserDataToFileG',userDataG);
    cy.log('User data saved:', JSON.stringify(userDataG));

  })
})
