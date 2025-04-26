describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    cy.visit('https://sky88.com')
    cy.wait(3000)
    cy.get('.modal-topsports-cl__banner').click()
    cy.get('.btn-join-now').click()
    cy.get('.header-primary > ul > :nth-child(1) > a').click()
    cy.get('.login-form-other > span').click()
    const brand = 'sky88';
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
    const randomNumber = Math.floor(Math.random()*10)
    cy.log(randomStringAccount)
    cy.log(randomNumber)
    cy.get(':nth-child(2) > .base-input__wrap > input').type(randomStringAccount)
    cy.get(':nth-child(3) > .base-input__wrap > input').type("Kha6868@")
    cy.get('[error-same-as="Nhập lại mật khẩu chưa trùng khớp"] > .base-input__wrap > input').type("Kha6868@")
    cy.get(':nth-child(5) > .base-input__wrap > input').type(phoneNumber)
    cy.get(':nth-child(6) > .base-input__wrap > input').type(randomStringAccount+randomNumber)
    cy.get('.base-button').click()
    cy.get('.lucky-content__items').contains(randomNumber).click()
    cy.get('.lucky-content > .base-button').click()
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
