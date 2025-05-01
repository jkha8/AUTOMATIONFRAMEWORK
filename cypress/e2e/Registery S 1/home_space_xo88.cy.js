const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = '3563e80dc554626c4fa3ddc53e310fcc:236ac6c9d4874b5e763a45736c33b589';
const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';
describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    const domain = decrypt(encryptedDomain);
    const password = decrypt(encryptedPassword);
    cy.visit(`https://${domain}`) 
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
    cy.get('.form-register > .base-input-custom--password > .base-input-custom__wrap > .base-input-custom__input-container > input').type(password)
    cy.get('[start-zero=""] > .base-input-custom__wrap > .base-input-custom__input-container > input').type(phoneNumber)
    cy.get('.form-register > .base-button > .base-button__slot').click()
    cy.get('.wrapper-user-login__right--name > span').contains("sut17")

    const userData = {
      account: randomStringAccount,
      password: encryptedPassword,
      phoneNumber: generateRandomPhoneNumber()
    };
    cy.task('saveUserDataToFile',userData);
    cy.log('User data saved:', JSON.stringify(userData));

  })
})
