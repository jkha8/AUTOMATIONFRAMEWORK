describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    cy.visit('https://fa88.tv/')
    const brand = 'fa88';
    const randomStringAccount = `sut17${brand.toLowerCase()}${Math.random().toString(36).substring(2,10)}`
    cy.log(randomStringAccount)
    cy.get('#usrname').type(randomStringAccount)
    cy.get('#pwd').type("Kha6868@")
    cy.get('.pc').click()
    cy.get('body').should('be.visible'); 
    cy.wait(5000)
    cy.origin('https://v.fa88.tv', () => {
      cy.url().should('include', 'v.fa88.tv');
    });

    const userDataG = {
      account: randomStringAccount,
      password: "Kha6868@"
    };
    cy.task('saveUserDataToFileG',userDataG);
    cy.log('User data saved:', JSON.stringify(userDataG));

  })
})
