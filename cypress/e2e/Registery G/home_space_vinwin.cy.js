describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    cy.visit('https://vin.win/')
    const brand = 'viny';
    const randomStringAccount = `sut17${brand.toLowerCase()}${Math.random().toString(36).substring(2,10)}`
    cy.log(randomStringAccount)
    cy.get('#usrname').type(randomStringAccount)
    cy.get('#pwd').type("Kha6868@")
    cy.get(':nth-child(15) > .form-control').type("Kha6868@")
    cy.get('.btnsubmit > img').click()
    cy.wait(5000)
    cy.origin('https://play.gem.win', () => {
      cy.url().should('include', 'play.gem.win');
    });

    const userDataG = {
      account: randomStringAccount,
      password: "Kha6868@"
    };
    cy.task('saveUserDataToFileG',userDataG);
    cy.log('User data saved:', JSON.stringify(userDataG));

  })
})
