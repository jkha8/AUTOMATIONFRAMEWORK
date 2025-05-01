const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = 'c0f3f5e685b73d0a31e1be989582d608:fcca690b072aaa687d02514ba23144b0';
const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';
describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    const domain = decrypt(encryptedDomain);
    const password = decrypt(encryptedPassword);
    cy.visit(`https://${domain}`) 
    cy.wait(3000)
    cy.get('.header-content').click()
    cy.get('.base-button--bg-green').click()
    const brand = 'sv88';
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
    cy.get('.form-register > .base-input--password > .base-input__wrap > input').type(password)
    cy.get(':nth-child(4) > .base-input__wrap > input').type(phoneNumber)
    cy.get('.form-register > .base-button').click()
    cy.get('.lucky-content__items').contains(randomNumber).click()
    cy.get('.lucky-content > .base-button').click()
    cy.get('.username').contains("sut17")

    const userData = {
      account: randomStringAccount,
      password: encryptedPassword,
      phoneNumber: generateRandomPhoneNumber()
    };
    cy.task('saveUserDataToFile',userData);
    cy.log('User data saved:', JSON.stringify(userData));

  })
})
