const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = 'ced7b79c01768ef63ab1349a528cac03:2afff0e20f039bf17e4090359b2c281c';
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
    const brand = 'x8';
    const randomStringAccount = `sut17${brand.toLowerCase()}${Math.random().toString(36).substring(2,10)}`
    cy.log(randomStringAccount)
    cy.get('#username').type(randomStringAccount)
    cy.get('#password').type(password)
    cy.get('.btn > .d-block').click()
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
