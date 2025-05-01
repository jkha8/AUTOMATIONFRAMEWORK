const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = '912ff8064418d2b858a43d14f91f707f:255eeb219fa54596f467c805f2b619a8';
const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';
describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    const domain = decrypt(encryptedDomain);
    const password = decrypt(encryptedPassword);
    cy.visit(`https://${domain}`) 
    cy.url().then((oldUrl) => {
      const oldOrigin = new URL(oldUrl).origin;
    const PREFIX = 'sut17'; // 5 ký tự
    const BRAND = 'win79';   // 5 ký tự
    const RANDOM_LENGTH = 15 - (PREFIX.length + BRAND.length); // 5 ký tự
    const randomStringAccount = `${PREFIX}${BRAND.toLowerCase()}${Math.random().toString(36).substring(2, 2 + RANDOM_LENGTH)}`;
    cy.log(randomStringAccount)
    cy.get('#usrname2').type(randomStringAccount)
    cy.get('#pwd2').type(password)
    cy.get('#registerForm > .btn_form > .btnsubmit > img').click()
    cy.wait(5000)
    cy.url().then((newUrl) => {
      const newOrigin = new URL(newUrl).origin;

      if (newOrigin !== oldOrigin) {
        cy.log('✅ Đã chuyển domain.');
      } else {
        throw new Error('❌ Không chuyển trang – có thể captcha sai hoặc lỗi hệ thống (vượt quá giới hạn hoặc đăng ký quá nhiều tài khoản).');
      }

    const userDataG = {
      account: randomStringAccount,
      password: encryptedPassword
    };
    cy.task('saveUserDataToFileG',userDataG);
    cy.log('User data saved:', JSON.stringify(userDataG));

  })
});
});
});