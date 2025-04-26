describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    cy.viewport(1920,1080)
    cy.visit('https://fc88.net')
    //cy.get('.modal-notification__content > img', { timeout: 20000 }).should('be.visible').click()
    //cy.get('.bg-kn-yellow-200').click({force: true})
    cy.get('.btn-outline').click()
    const brand = 'fc88';
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
    cy.get(':nth-child(2) > .form-control > .flex-1').type(randomStringAccount)
    cy.get(':nth-child(3) > .form-control > .flex-1').type("Kha6868@")
    cy.get(':nth-child(4) > .form-control > .flex-1').type(phoneNumber)
    cy.wait(2000)
    cy.get('#register > .btn').click()
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
