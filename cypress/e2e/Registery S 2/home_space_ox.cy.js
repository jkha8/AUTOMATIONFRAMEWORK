const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = 'd2be85b0e6aef52dde28bfac41a9719c:5df62895e20cd9388de614533f95b7a2';
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
    cy.get('.bg-kn-yellow-200').should('have.text', 'ĐĂNG KÝ').trigger('mouseover').wait(1000).click({force:true});
    // dblclick({force: true})
    const brand = 'oxbet';
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
