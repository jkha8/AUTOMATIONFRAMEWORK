const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = '27aa12cb401780e18dff0d24dfc18c20:dd01b1422995852b1c23617cfceddc79';
const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';
describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    const domain = decrypt(encryptedDomain);
    const password = decrypt(encryptedPassword);
    cy.visit(`https://${domain}`) 
    cy.document().then((doc) =>{
      const btn = doc.querySelector('#onsignal-slidedown-allow-button');
      if (btn && btn.offsetParent !== null){
        cy.wrap(btn).click();
        cy.log('Đã click nút thông báo OneSignal');
      } else {
        cy.log('Không có popup OneSingal bỏ qua');
      }
    });
    cy.get('.header__auth-register > .btn > .base-button--content').click()
    const brand = 'Sin88';
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
    cy.get('.box-content > :nth-child(1) > .base-input > .base-input__wrap > .base-input__wrap-input > .imask').type(randomStringAccount)
    cy.get('.box-content > :nth-child(2) > .base-input > .base-input__wrap > .base-input__wrap-input > .imask').type(phoneNumber)
    cy.get(':nth-child(3) > .base-input > .base-input__wrap > .base-input__wrap-input > .imask').type(password)
    cy.get('.mb-23 > .base-input > .base-input__wrap > .base-input__wrap-input > .imask').type(password)
    cy.wait(500);
    cy.get('.form-login__wrap-content > :nth-child(2) > .btn').should('be.visible').should('not.have.class','inactive').click()
    //cy.get('.form-login__wrap-content > :nth-child(2) > .btn > .base-button--content').should('be.visible').and('not.be.disabled').click()
    cy.get(':nth-child(2) > .account-tabs__nav > .nav-item.active > .nav-link > .tab-content > .label').should('be.visible');

    const userData = {
      account: randomStringAccount,
      password: encryptedPassword,
      phoneNumber: generateRandomPhoneNumber()
    };
    cy.task('saveUserDataToFile',userData);
    cy.log('User data saved:', JSON.stringify(userData));

  })
})
