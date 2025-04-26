describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    cy.visit('https://lucky88.com/')
    cy.get('.base-button--bg-green').click()
    const brand = 'lk88';
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
    cy.get('.form-register > :nth-child(2) > .base-input__wrap > input').type(randomStringAccount)
    cy.get('.form-register > .base-input--password > .base-input__wrap > input').type("Kha6868@")
    cy.get(':nth-child(4) > .base-input__wrap > input').type(phoneNumber)
    cy.get('.form-register > .base-button').click()
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
