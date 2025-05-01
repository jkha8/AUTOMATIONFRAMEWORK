const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = '8c636eaad6200e513309311e79a34931:a9ed30d0f4620e13643fbed82b8c2c55';
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
    //cy.get('.header-content').click()
    cy.get('.header__login-form > .main--primary').click()
    const brand = 'mibet';
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
    const randomNumber = Math.floor(Math.random()*10)
    cy.log(randomStringAccount)
    cy.get('#username').type(randomStringAccount)
    cy.get('#password').type(password)
    cy.get('#passwordConfirm').type(password)
    cy.get('#phone').type(phoneNumber)
    cy.get('.form__btn-login > .base-button > span').click()
    //cy.get('.form-register > .base-button').should('be.visible').should('not.have.class','inactive').click()
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
