describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    cy.visit('https://x8.games/')
    const brand = 'x8';
    const randomStringAccount = `sut17${brand.toLowerCase()}${Math.random().toString(36).substring(2,10)}`
    cy.log(randomStringAccount)
    cy.get('#username').type(randomStringAccount)
    cy.get('#password').type("Kha6868@")
    cy.get('.btn > .d-block').click()
    cy.wait(5000)
    cy.origin('https://play.x8.games', () => {
      cy.url().should('include', 'play.x8.games');
    });

    const userDataG = {
      account: randomStringAccount,
      password: "Kha6868@"
    };
    cy.task('saveUserDataToFileG',userDataG);
    cy.log('User data saved:', JSON.stringify(userDataG));

  })
})
