const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = '1a596bd17b92a740023a20f54092c3c9:410ad5c4091c280430c397eb5508e9cf';
const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';
describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    const domain = decrypt(encryptedDomain);
    const password = decrypt(encryptedPassword);
    cy.visit(`https://${domain}`, {
      auth:{
        username: 'admin',
        password: 'admin123'
      }
    });
    cy.wait(2000)
    cy.get('body').then(($body) => {
      if($body.find('.rounded-2xl > .mt-6').length>0){
        cy.get('.rounded-2xl > .mt-6',{ timeout: 5000}).should('be.visible').click({ force: true });
        cy.log('Đã click nút tắt popup');
      } else {
        cy.log('Không có popup bỏ qua');
      }
    });
    //cy.get('.rounded-2xl > .mt-6')
    cy.get('.items-start > .justify-center > .flex').click()
    const brand = 'may88';
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
    cy.get(':nth-child(3) > #username > .form__group > .form-text > #username_id').type(randomStringAccount)
    cy.get(':nth-child(4) > #password > .form__group > #password_id').type(password)
    cy.get('#phone_id').type(phoneNumber)
    cy.get('.text-body-semibold').click()
    cy.get('.base-dropdown-header__user__amount').contains("0 K")

    const userData = {
      account: randomStringAccount,
      password: encryptedPassword,
      phoneNumber: generateRandomPhoneNumber()
    };
    cy.task('saveUserDataToFile',userData);
    cy.log('User data saved:', JSON.stringify(userData));

  })
})
