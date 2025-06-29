const { delay } = require("bluebird")
const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = '43bd67a5adc9bb5c5c92dbd6553cccd1:52cd50495e83ffb7015ea267fc8d2354';
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
    cy.get('.header__block-right > .v-btn--primary > .v-btn__content').trigger('mouseover').wait(1000).click({force:true});
    //cy.contains('button','Đăng ký').dblclick({force: true})
    //cy.get('body').should('contain.text','Đăng ký').dblclick({force: true})
    const brand = 'bong99';
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
    cy.get('#input-6').trigger('mouseover').wait(1000).type(randomStringAccount,{delay: 100})
    cy.get('#input-8').type(password,{delay: 100})
    cy.get('#input-10').type(password,{delay: 100})
    cy.get('#input-12').type(phoneNumber)
    cy.wait(2000)
    cy.get('.form-register').contains('Đăng').click()
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
