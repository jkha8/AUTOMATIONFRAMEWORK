describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    cy.visit('https://debet.so')
    //cy.get('.button--login > span').click()
    cy.get('.button--login').click()
    const brand = 'Debet';
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
    cy.get(':nth-child(1) > .base-input__wrap > .base-input__wrap-input > .imask').type(randomStringAccount)
    cy.get('.base-input--password > .base-input__wrap > .base-input__wrap-input > .imask').type("Kha6868@")
    cy.get(':nth-child(3) > .base-input__wrap > .base-input__wrap-input > .imask').type(phoneNumber)
    cy.get('#cf-turnstile-register > div').click()
    cy.get('div.w-100 > .btn > .base-button--content').click()

    const userData = {
      account: randomStringAccount,
      password: "Kha6868@",
      phoneNumber: generateRandomPhoneNumber()
    };
    cy.task('saveUserDataToFile',userData);
    cy.log('User data saved:', JSON.stringify(userData));

  })
})
