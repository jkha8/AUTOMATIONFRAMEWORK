const { decrypt } = require('/Users/user/IdeaProjects/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

//const encryptedDomain = 'd5755addfd46ff760b56ec75a38116e8:936eb757154bfc619e39a2e130b785d6';
const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';
describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    //const domain = decrypt(encryptedDomain);
    const password = decrypt(encryptedPassword);
    cy.visit("https://fm88.com")
    cy.get('.buttons > .base-button__color-primary > .backdrop-btn').click()
    const brand = 'fm88';
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
    //const randomNumber = Math.floor(Math.random()*10)
    cy.log(randomStringAccount)
    cy.get(':nth-child(2) > .base-input__wrap > .base-input__wrap-input > .imask').type(randomStringAccount)
    cy.get(':nth-child(3) > .base-input__wrap > .base-input__wrap-input > .imask').type(password)
    cy.get(':nth-child(4) > .base-input__wrap > .base-input__wrap-input > .imask').type(password)
    cy.get(':nth-child(5) > .base-input__wrap > .base-input__wrap-input > .imask').type(phoneNumber)
    cy.wait(1500)
    cy.get('div.w-100 > .btn').click()
    //cy.get('.lucky-content__items').contains(randomNumber).click()
    //cy.get('.lucky-content > .base-button').click()
    cy.wait(1000)
    //cy.get('.bg-str-primary').should('be.visible')
    cy.get('.user-info-balance').contains("0 đ")

    const userData = {
      account: randomStringAccount,
      password: encryptedPassword,
      phoneNumber: generateRandomPhoneNumber()
    };
    cy.task('saveUserDataToFile',userData);
    cy.log('User data saved:', JSON.stringify(userData));

  })
})
