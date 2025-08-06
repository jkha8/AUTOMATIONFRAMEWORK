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
    cy.visit("https://zo88.com")
    cy.wait(2500)
    cy.get('.keen-slider > :nth-child(1) > .object-contain').click()
    cy.wait(200)
    cy.get('.mobile-header > .auth-buttons > .auth-buttons__register').click()
    const brand = 'zo88';
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
    cy.get('#username').type(randomStringAccount)
    cy.wait(200)
    cy.get('#phone').trigger("mouseover").type(phoneNumber,{delay:50})
    cy.get('#password').type(password)
    cy.wait(1500)
    cy.get('.auth-form__bottom > .button').click()
    cy.wait(1000)
    //cy.get('.bg-str-primary').should('be.visible')
    cy.get('.mobile-header > .user-section > .user-section__right > .user-info > .user-info__content > .user-info__user-name').contains("sut17")

    const userData = {
      account: randomStringAccount,
      password: encryptedPassword,
      phoneNumber: generateRandomPhoneNumber()
    };
    cy.task('saveUserDataToFile',userData);
    cy.log('User data saved:', JSON.stringify(userData));

  })
})
