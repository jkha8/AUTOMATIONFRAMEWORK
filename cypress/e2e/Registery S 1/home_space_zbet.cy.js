const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = '198fde76e52956cdaa9b24994b8c48cc:03c1a8bbccedb4c59d08161d3ef08fa0';
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
    cy.get('body').then(($body) => {
      if($body.find('#onesignal-slidedown-allow-button').length>0){
        cy.get('#onesignal-slidedown-allow-button',{ timeout: 5000}).should('be.visible').click({ force: true });
        cy.log('Đã click nút tắt popup');
      } else {
        cy.log('Không có popup bỏ qua');
      }
    });
    //cy.get('#onesignal-slidedown-allow-button').click()
    cy.get('.user-info__none-login > .color--primary').click()
    const brand = 'zbet';
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
    cy.get('.form-register__wrap-input > :nth-child(1) > .base-input__wrap > .base-input__wrap-input > .imask').type(randomStringAccount)
    cy.get('.base-input--password > .base-input__wrap > .base-input__wrap-input > .imask').type(password)
    cy.get(':nth-child(2) > .base-input__wrap > .base-input__wrap-input > .imask').type(phoneNumber)
    cy.wait(2000)
    cy.get('.form-register__wrap-btn > .btn > .base-button--content').click()
    //cy.get('.form-register > .base-button').should('be.visible').should('not.have.class','inactive').click()
    cy.get('h6').contains("sut17")

    const userData = {
      account: randomStringAccount,
      password: encryptedPassword,
      phoneNumber: generateRandomPhoneNumber()
    };
    cy.task('saveUserDataToFile',userData);
    cy.log('User data saved:', JSON.stringify(userData));

  })
})
