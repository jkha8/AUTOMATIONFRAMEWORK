const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = 'd0295b3f6b992c4b8875e5db29c5454e:b16cddf5f1903b83eea3bc4669cec87f';
const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';
describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    const domain = decrypt(encryptedDomain);
    const password = decrypt(encryptedPassword);
    cy.visit(`https://${domain}`) 
    cy.wait(3000)
    cy.get('body').then(($body) => {
      if($body.find('.modal-notification__content > img').length>0){
        cy.get('.modal-notification__content > img',{ timeout: 5000}).should('be.visible').click({ force: true });
        cy.log('Đã click nút tắt popup');
      } else {
        cy.log('Không có popup bỏ qua');
      }
    });
    // cy.document().then((doc) =>{
    //   const btn = doc.querySelector('.modal-notification__content > img');
    //   //cy.get('.modal-notification__content > img')
    //   if (btn && btn.offsetParent !== null){
    //     cy.wrap(btn).click();
    //     cy.log('Đã click nút tắt popup');
    //   } else {
    //     cy.log('Không có popup bỏ qua');
    //   }
    // });
    //cy.get('.modal-close > img').click()
    cy.get('.base-button--bg-yellow-fill').click()
    const brand = 'net88';
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
    cy.get('#username-register').type(randomStringAccount)
    cy.get('input[type="password"]').eq(1).type(password,{ force : true })
    cy.get('input[type="tel"]').type(phoneNumber,{ force : true })
    cy.get('.form-register__action > .base-button').click()
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
