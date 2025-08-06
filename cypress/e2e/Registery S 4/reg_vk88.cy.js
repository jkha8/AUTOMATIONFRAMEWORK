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
    cy.visit("https://vk88.com")
    cy.get(':nth-child(2) > #dang-ky').click()
    const brand = 'vk88';
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
    cy.get('.gap-4 > :nth-child(1) > .relative > .input').type(randomStringAccount)
    cy.get('.base-password-input > .relative > .input').type(password)
    cy.get(':nth-child(3) > .relative > .input').type(phoneNumber)
    cy.wait(1500)
    cy.get('.mt-2 > #dang-ky').click();
    //cy.get('.lucky-content__items').contains(randomNumber).click()
    //cy.get('.lucky-content > .base-button').click()
    cy.wait(1200)
    cy.get('#nap-tien').should('be.visible')
    //cy.get('.user-info-balance').contains("0 đ")

    const userData = {
      account: randomStringAccount,
      password: encryptedPassword,
      phoneNumber: generateRandomPhoneNumber()
    };
    cy.task('saveUserDataToFile',userData);
    cy.log('User data saved:', JSON.stringify(userData));

  })
})
