const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = '30dedd7f36518258b47c1e552a85d1b8:f68dfff18d8b5b757f473f884dcd3aee';
const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';
describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    const domain = decrypt(encryptedDomain);
    const password = decrypt(encryptedPassword);
    cy.visit(`https://${domain}`) 
    cy.get('.user-not-login > .base-button--bg-green').click()
    cy.get('.register').click()
    const brand = 'uk88';
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
    cy.get(':nth-child(2) > .base-input__wrap > input').type(randomStringAccount)
    cy.get('.base-input--password > .base-input__wrap > input').type(password)
    cy.get(':nth-child(6) > .base-input__wrap > input').type(phoneNumber)
    cy.get('.form-register__action > .base-button').click()
    cy.get('.lucky-number__content--numbers > :nth-child(10)').click()
    cy.get('.lucky-number__content--action').click()

    const userData = {
      account: randomStringAccount,
      password: encryptedPassword,
      phoneNumber: generateRandomPhoneNumber()
    };
    cy.task('saveUserDataToFile',userData);
    cy.log('User data saved:', JSON.stringify(userData));

  })
})
