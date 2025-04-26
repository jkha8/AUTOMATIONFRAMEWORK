describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    cy.viewport(1920,1080)
    cy.visit('https://11bet.com')
    cy.get('.modal-notification__content > img', { timeout: 20000 }).should('be.visible').click()
    cy.get('.btn--home-register').click()
    const brand = '11bet';
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
    cy.get(':nth-child(1) > .base-input__wrap > input').type(randomStringAccount, {delay: 50})
    cy.get('.base-input--password > .base-input__wrap > input').type("Kha6868@")
    cy.get(':nth-child(3) > .base-input__wrap > input').type(phoneNumber)
    cy.wait(2000)
    cy.get('#formRegister > .base-button').contains("Đăng ký").click()
    //cy.get('.form-register > .base-button').should('be.visible').should('not.have.class','inactive').click()
    cy.get('.username').contains("sut17")

    const userData = {
      account: randomStringAccount,
      password: "Kha6868@",
      phoneNumber: generateRandomPhoneNumber()
    };
    cy.task('saveUserDataToFile',userData);
    cy.log('User data saved:', JSON.stringify(userData));

  })
})
