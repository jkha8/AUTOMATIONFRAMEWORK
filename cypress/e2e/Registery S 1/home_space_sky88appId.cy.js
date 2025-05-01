const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = 'dbfd1e5076a76f11179d4462494534a3:81c864990d1cdcfcc642c1bdbe1f4d55';
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
    cy.get(':nth-child(3) > .base-input__wrap > input').type(password)
    cy.get('[error-same-as="Nhập lại mật khẩu chưa trùng khớp"] > .base-input__wrap > input').type(password)
    cy.get(':nth-child(5) > .base-input__wrap > input').type(phoneNumber)
    cy.get(':nth-child(6) > .base-input__wrap > input').type(randomStringAccount+randomNumber)
    cy.get('.base-button').click()
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
