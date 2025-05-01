const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = '6edc941abcf517c441faee8c97710ca2:b40d9572c358369c8f834311719e609b';
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
    cy.get('.btn-header__animation').click()
    const brand = 'fabet';
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
    cy.get('#register > :nth-child(2) > .input-wrapper > .input-control').type(randomStringAccount)
    cy.get('#register > .common-text-input.input-password > .input-wrapper > .input-control').type(password)
    cy.get(':nth-child(4) > .input-wrapper > .input-control').type(phoneNumber)
    cy.wait(2000)
    cy.get('.btn-primary').click()
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
