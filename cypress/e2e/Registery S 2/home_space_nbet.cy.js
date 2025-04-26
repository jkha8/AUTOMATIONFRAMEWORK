describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
    
  })

  it('successfully loads', () => {
    cy.viewport(1920,1080)
    //cy.visit('https://nbet.com')
    const url = 'https://nbet.com'
    cy.intercept(url).as('url')
    cy.visit(url, {failOnStatusCode: false})

    cy.wait('@url')
      .its('response')
      .then(response => {
      expect(response.statusCode).not.to.eq(200)
      })
    cy.get('.base-button--bg-yellow > div').click()
    // cy
    // .get('.bg-kn-yellow-200')
    // .should('have.text', 'ĐĂNG KÝ').dblclick()
    const brand = 'nbet';
    const randomStringAccount = `sut17${brand.toLowerCase()}${Math.random().toString(36).substring(2,10)}`
    function generateRandomPhoneNumber(){
      const length = Math.floor(Math.random()*2)+10;
      const prefiexes = ['03','09'];
      let phone = prefiexes[Math.floor(Math.random() * prefiexes.length)];
    
    while(phone.length < length) {
      phone += Math.floor(Math.random()*10); 
    }
    return phone;
    }
    const phoneNumber = generateRandomPhoneNumber("08");
    cy.log(randomStringAccount)
    cy.get('.register-form > :nth-child(1) > .base-input__wrap > input').type(randomStringAccount)
    cy.get('.register-form > :nth-child(2) > .base-input__wrap > input').type("Kha6868@")
    cy.get(':nth-child(3) > .base-input__wrap > input').type("Kha6868@")
    cy.get(':nth-child(4) > .base-input__wrap > input').type(phoneNumber)
    cy.wait(2000)
    cy.get('.register-form > .base-button > div').click()
    //cy.get('.form-register > .base-button').should('be.visible').should('not.have.class','inactive').click()
    cy.get('#swal2-title').contains("ĐĂNG KÝ THÀNH CÔNG")

    const userData = {
      account: randomStringAccount,
      password: "Kha6868@",
      phoneNumber: generateRandomPhoneNumber()
    };
    cy.task('saveUserDataToFile',userData);
    cy.log('User data saved:', JSON.stringify(userData));

  })
})
