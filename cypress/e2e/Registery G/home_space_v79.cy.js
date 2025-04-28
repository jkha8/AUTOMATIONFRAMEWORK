describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    cy.visit('https://lp.vip79.com/')
    const PREFIX = 'sut17'; // 5 ký tự
    const BRAND = 'vip79';   // 5 ký tự
    const RANDOM_LENGTH = 15 - (PREFIX.length + BRAND.length); // 5 ký tự
    const randomStringAccount = `${PREFIX}${BRAND.toLowerCase()}${Math.random().toString(36).substring(2, 2 + RANDOM_LENGTH)}`;
    cy.log(randomStringAccount)
    cy.get('#usrname').type(randomStringAccount)
    cy.get('#pwd').type("Kha6868@")
    cy.get('[src="images/btn-dangky2.png"]').click()
    cy.wait(5000)
    cy.origin('https://i.vip79.com', () => {
      cy.url().should('include', 'i.vip79.com');
    });

    const userDataG = {
      account: randomStringAccount,
      password: "Kha6868@"
    };
    cy.task('saveUserDataToFileG',userDataG);
    cy.log('User data saved:', JSON.stringify(userDataG));

  })
})
