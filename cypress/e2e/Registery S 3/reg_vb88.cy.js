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
    cy.visit("https://vb88.com")
    cy.wait(500)
    cy.get('.border-primary-400').click({force:true})
    const brand = 'vb88';
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
    cy.get('#username_id').type(randomStringAccount)
    cy.get('#password').type(password)
    cy.get('#phone_id').type(phoneNumber)
    cy.wait(1500)
    cy.get('.btn').click()
    //cy.get('.lucky-content__items').contains(randomNumber).click()
    //cy.get('.lucky-content > .base-button').click()
    cy.wait(1000)
    cy.get('.mx-3 > .grid').should('be.visible')
    //cy.get('#balance').contains("0 K")

    const userData = {
      account: randomStringAccount,
      password: encryptedPassword,
      phoneNumber: generateRandomPhoneNumber()
    };
    cy.task('saveUserDataToFile',userData);
    cy.log('User data saved:', JSON.stringify(userData));

  })
})
