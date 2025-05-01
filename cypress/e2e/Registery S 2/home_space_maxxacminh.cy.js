const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = '53bb0dde9ddd66d13b005e6647f629d5:0f05cc9c47d3990995e174f5dfa98278';
const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';

describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    cy.viewport(1920,1080)
    const domain = decrypt(encryptedDomain);
    const password = decrypt(encryptedPassword);
    cy.visit(`https://${domain}`)  
    cy.get('.buttons > .base-button__color-primary').click()
    const brand = 'max88';
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
    cy.get(':nth-child(2) > .base-input__wrap > .base-input__wrap-input > .imask').type(randomStringAccount)
    cy.get(':nth-child(3) > .base-input__wrap > .base-input__wrap-input > .imask').type(password)
    cy.get(':nth-child(4) > .base-input__wrap > .base-input__wrap-input > .imask').type(password)
    cy.get(':nth-child(5) > .base-input__wrap > .base-input__wrap-input > .imask').type(phoneNumber)
    cy.get('#cf-turnstile-register > div').click()
    cy.wait(2000)
    cy.get('.btn-primary').click()
    //cy.get('.form-register > .base-button').should('be.visible').should('not.have.class','inactive').click()
    cy.get('#swal2-title').contains("ĐĂNG KÝ THÀNH CÔNG")

    const userData = {
      account: randomStringAccount,
      password: encryptedPassword,
      phoneNumber: generateRandomPhoneNumber()
    };
    cy.task('saveUserDataToFile',userData);
    cy.log('User data saved:', JSON.stringify(userData));

  })
})
