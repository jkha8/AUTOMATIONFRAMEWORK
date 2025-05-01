const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = '2054e70bc0efc7e0a2089fbf2a8edbc7:a114159580946ff6e4259ac37e070900';
const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';
describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    const domain = decrypt(encryptedDomain);
    const password = decrypt(encryptedPassword);
    cy.visit(`https://${domain}`) 
    // cy.get('body').then(($body) => {
    //   if($body.find('.header-content').length>0){
    //     cy.get('.header-content',{ timeout: 5000}).should('be.visible').click();
    //     cy.log('Đã click nút tắt popup');
    //   } else {
    //     cy.log('Không có popup bỏ qua');
    //   }
    // });
    //cy.get('.header-content')
    cy.wait(3000)
    cy.get('[alt="popup-deposit-bonus"]').click()
    cy.get('.header__login-form > .main--second').click()
    const brand = '8live';
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
    const phoneNumber = generateRandomPhoneNumber("08")
    cy.log(randomStringAccount)
    cy.get('.text-lowercase').type(randomStringAccount)
    cy.get('[name="password"] > .base-input__wrap > input').type(password)
    cy.get('[name="passwordConfirm"] > .base-input__wrap > input').type(password)
    cy.get('[name="phone"] > .base-input__wrap > input').type(phoneNumber)
    cy.get('.base-button > span').click()
    //cy.get('.form__btn-login').should('be.visible').should('not.have.class','inactive').click()
    cy.get('#swal2-title').contains("Đăng Ký Thành Công")

    const userData = {
      account: randomStringAccount,
      password: encryptedPassword,
      phoneNumber: generateRandomPhoneNumber()
    };
    cy.task('saveUserDataToFile',userData);
    cy.log('User data saved:', JSON.stringify(userData));

  })
})
