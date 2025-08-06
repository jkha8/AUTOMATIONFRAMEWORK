const { decrypt } = require('/Users/user/IdeaProjects/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

//const encryptedDomain = 'd5755addfd46ff760b56ec75a38116e8:936eb757154bfc619e39a2e130b785d6';
const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';
describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    //const domain = decrypt(encryptedDomain);
    cy.viewport(1920,1080)
    const password = decrypt(encryptedPassword);
    cy.visit("https://lu88.com")
    cy.wait(2000)
    cy.get('.md\\:vw-md\\:-right-3').click()
    cy.get('.hover\\:\\!bg-priv2-green3').click()
    const brand = 'lu88';
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
    cy.get('#username-register-input').type(randomStringAccount)
    cy.get('#password-register-input').type(password)
    cy.get(':nth-child(3) > .relative > .input-v2-custom').type(phoneNumber)
    cy.wait(1500)
    cy.get('.xm\\:pt-8 > .form-new > .flex').click()
    //cy.get('.lucky-content__items').contains(randomNumber).click()
    //cy.get('.lucky-content > .base-button').click()
    cy.wait(1000)
    cy.get('[style="width: 304px; height: 78px;"] > div > iframe').click()
    cy.get('.bg-str-primary').should('be.visible')
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
