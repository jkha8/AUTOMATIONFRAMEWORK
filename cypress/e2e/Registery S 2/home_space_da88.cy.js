const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = 'b2aa94520edfc708a910a8653467ff00:1e146d15f9d3aadc722538da2d68e07c';
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
    //cy.get('.modal-notification__content > img', { timeout: 20000 }).should('be.visible').click()
    cy.get('#register_btn').click()
    const brand = 'da88';
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
    cy.get(':nth-child(1) > .base-input__wrap > input').type(randomStringAccount, {delay: 50})
    cy.get('.base-input--password > .base-input__wrap > input').type(password)
    cy.get(':nth-child(3) > .base-input__wrap > input').type(phoneNumber)
    cy.wait(2000)
    cy.get('.login-form > .base-button').contains("Đăng ký").click()
    //cy.get('.form-register > .base-button').should('be.visible').should('not.have.class','inactive').click()
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
