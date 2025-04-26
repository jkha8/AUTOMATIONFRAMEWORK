describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    cy.viewport(1920,1080)
    cy.visit('https://oxbet.com')
    //cy.get('.modal-notification__content > img', { timeout: 20000 }).should('be.visible').click()
    //cy.get('.bg-kn-yellow-200').click({force: true})
    cy
    .get('.bg-kn-yellow-200')
    .should('have.text', 'ĐĂNG KÝ').dblclick()
    const brand = 'oxbet';
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
    cy.get('#register > :nth-child(2) > .input-wrapper > .input-control').type(randomStringAccount)
    cy.get('#register > .common-text-input.input-password > .input-wrapper > .input-control').type("Kha6868@")
    cy.get(':nth-child(4) > .input-wrapper > .input-control').type(phoneNumber)
    cy.wait(2000)
    cy.get('.btn-primary').click()
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
