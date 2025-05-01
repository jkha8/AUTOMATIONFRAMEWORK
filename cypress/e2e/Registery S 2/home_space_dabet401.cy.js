const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = '9ee23180061bc07885ef355576fb313e:93077dffee96c7b39b6aa8433285355c19007e7fa77b573eee2f7ecaf24d08e4';
const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';
const { delay } = require("bluebird")

describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
    
  })

  it('successfully loads', () => {
    cy.viewport(1920,1080)
    const domain = decrypt(encryptedDomain);
    const password = decrypt(encryptedPassword);
    cy.visit(`https://${domain}`) 
    //cy.get('[id="btn--login"]').dblclick()
    //cy.get('.header-login__form').contains("Đăng Ký").click()
    const brand = 'dabet';
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
    cy.get('.text-lowercase').type(randomStringAccount)
    cy.get('.base-input--password > .base-input__wrap > input').type(password)
    cy.get(':nth-child(5) > .base-input__wrap > input').type(phoneNumber)
    cy.wait(2000)
    cy.get('.d-flex > .base-button').click()
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
