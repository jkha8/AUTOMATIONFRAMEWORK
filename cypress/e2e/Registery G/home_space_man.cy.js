describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    cy.visit('https://man.club/')
    const brand = 'man';
    const randomStringAccount = `sut17${brand.toLowerCase()}${Math.random().toString(36).substring(2,10)}`
    cy.log(randomStringAccount)
    cy.get('#usrname').type(randomStringAccount)
    cy.get('#pwd').type("Kha6868@")
    //cy.get(':nth-child(15) > .form-control').type("Kha6868@")
    cy.get('button > img').click()
    cy.wait(5000)
    cy.origin('https://play.man.club', () => {
      cy.url().should('include', 'play.man.club');
    });

    const userDataG = {
      account: randomStringAccount,
      password: "Kha6868@"
    };
    cy.task('saveUserDataToFileG',userDataG);
    cy.log('User data saved:', JSON.stringify(userDataG));

  })
})
