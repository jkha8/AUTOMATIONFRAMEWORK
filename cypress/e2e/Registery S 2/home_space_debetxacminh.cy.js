const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = 'a68834bfdf1562353dbd50d8b057f5f6:f5b4c1b95e43bc65d654991fef597cce';
const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';
describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    const domain = decrypt(encryptedDomain);
    const password = decrypt(encryptedPassword);
    cy.visit(`https://${domain}`) 
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
    cy.get('.base-input--password > .base-input__wrap > .base-input__wrap-input > .imask').type(password)
    cy.get(':nth-child(3) > .base-input__wrap > .base-input__wrap-input > .imask').type(phoneNumber)
    cy.get('#cf-turnstile-register > div').click()
    cy.get('div.w-100 > .btn > .base-button--content').click()
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
