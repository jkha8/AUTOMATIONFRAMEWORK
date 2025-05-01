const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = '8069375ada014a95c2e59ea33b70a7fd:fa05f5b053b80663505b4c31a01c5b44';
const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';

describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  });

  it('successfully loads', () => {
    const domain = decrypt(encryptedDomain);
    const password = decrypt(encryptedPassword);
    const brand = 'yo88';
    const randomStringAccount = `sut17${brand.toLowerCase()}${Math.random().toString(36).substring(2, 10)}`;
    cy.log(randomStringAccount);

    cy.visit(`https://${domain}`);

    cy.url().then((oldUrl) => {
      const oldOrigin = new URL(oldUrl).origin;

      cy.get('#usrname').type(randomStringAccount);
      cy.get('#pwd').type(password);
      cy.get('.pc').click();

      cy.wait(5000);

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

        cy.task('saveUserDataToFileG', userDataG);
        cy.log('User data saved:', JSON.stringify(userDataG));
      });
    });
  });
});
