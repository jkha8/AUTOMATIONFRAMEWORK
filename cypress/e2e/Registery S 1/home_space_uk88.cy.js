describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    cy.visit('https://uk88.vip/')
    cy.get('.user-not-login > .base-button--bg-green').click()
    cy.get('.register').click()
    const brand = 'uk88';
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
    cy.get(':nth-child(2) > .base-input__wrap > input').type(randomStringAccount)
    cy.get('.base-input--password > .base-input__wrap > input').type("Kha6868@")
    cy.get(':nth-child(6) > .base-input__wrap > input').type(phoneNumber)
    cy.get('.form-register__action > .base-button').click()
    cy.get('.lucky-number__content--numbers > :nth-child(10)').click()
    cy.get('.lucky-number__content--action').click()

    const userData = {
      account: randomStringAccount,
      password: "Kha6868@",
      phoneNumber: generateRandomPhoneNumber()
    };
    cy.task('saveUserDataToFile',userData);
    cy.log('User data saved:', JSON.stringify(userData));

  })
})
