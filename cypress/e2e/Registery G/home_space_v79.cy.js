const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = '05f9db14c1dae69e12edd5cf432d3ff2:bf03a86a7e8e5f9368d6fbd0c9fe0a50';
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
    const BRAND = 'vip79';   // 5 ký tự
    const RANDOM_LENGTH = 15 - (PREFIX.length + BRAND.length); // 5 ký tự
    const randomStringAccount = `${PREFIX}${BRAND.toLowerCase()}${Math.random().toString(36).substring(2, 2 + RANDOM_LENGTH)}`;
    cy.log(randomStringAccount)
    cy.get('#usrname').type(randomStringAccount)
    cy.get('#pwd').type(password)
    cy.get('[src="images/btn-dangky2.png"]').click()
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
})
})
})