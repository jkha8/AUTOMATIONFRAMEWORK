describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    cy.visit('https://xo88.pro/')
    cy.get('.btn-register > .base-button__slot').click()
    const brand = 'Xo88';
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
    cy.get('.form-register > :nth-child(1) > .base-input-custom__wrap > .base-input-custom__input-container > input').type(randomStringAccount)
    cy.get('.form-register > .base-input-custom--password > .base-input-custom__wrap > .base-input-custom__input-container > input').type("Kha6868@")
    cy.get('[start-zero=""] > .base-input-custom__wrap > .base-input-custom__input-container > input').type(phoneNumber)
    cy.get('.form-register > .base-button > .base-button__slot').click()
    cy.get('.wrapper-user-login__right--name > span').contains("sut17")

    const userData = {
      account: randomStringAccount,
      password: "Kha6868@",
      phoneNumber: generateRandomPhoneNumber()
    };
    cy.task('saveUserDataToFile',userData);
    cy.log('User data saved:', JSON.stringify(userData));

  })
})
