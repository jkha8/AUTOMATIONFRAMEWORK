const { decrypt } = require('/Users/user/IdeaProjects/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = 'c6c0f06ba399426a289b1f86ee836fe3:bf5f5aaa4e05f22a30800b3951295239';
const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';
describe('The Home Page', () => {
  beforeEach(() => {
    // reset hoặc init nếu cần
  });

  // 📋 Hàm custom chờ GameCanvas thực sự vào màn chính
  function waitForScreenReady() {
    cy.log('⏳ Đang đợi screen chính...');
    let previousImage = null;
    let stableCount = 0;

    function checkCanvasStable() {
      cy.get('#GameCanvas').then($canvas => {
        const currentImage = $canvas[0].toDataURL();

        if (previousImage && currentImage === previousImage) {
          stableCount++;
        } else {
          stableCount = 0; // Reset nếu khác nhau
        }

        previousImage = currentImage;

        if (stableCount >= 2) {
          cy.log('✅ Canvas ổn định, vào screen chính rồi!');
          return;
        } else {
          cy.wait(5000); // Đợi thêm 5 giây
          checkCanvasStable();
        }
      });
    }

    checkCanvasStable();
  }

  it('successfully loads and register', () => {
    const domain = decrypt(encryptedDomain);
    const password = decrypt(encryptedPassword);
    cy.visit(`https://${domain}`) 

    const brand = 'iwin';
    const randomStringAccount = `sut17${brand.toLowerCase()}${Math.random().toString(36).substring(2,10)}`;
    cy.log('🔑 Random account:', randomStringAccount);

    let canvasBefore;
    let canvasAfter;

    // Step 1: Đợi vào screen chính
    waitForScreenReady();

    // Step 2: Capture canvas BEFORE đăng ký
    // cy.get('#GameCanvas').then($canvas => {
    //   canvasBefore = $canvas[0].toDataURL();
    // });

    // Step 3: Thao tác đăng ký
    cy.then(() => {
      cy.wait(1000)
      cy.get('#GameCanvas').click(399, 630,{force: true},{delay: 50}); // Click nút Đăng ký

      cy.get('#EditBoxId_1').type(randomStringAccount, { force: true });
      cy.get('#EditBoxId_2').click({ force: true }).type(password, { force: true });
      cy.get('#EditBoxId_3').click({ force: true }).type(password, { force: true });

      cy.get('#GameCanvas').click(450, 450); // Click nút xác nhận
      cy.wait(3500);
      cy.get('#EditBoxId_4').click({ force: true }).type('Đk Thành Công', { force: true });
    });

    // // Step 4: Capture canvas AFTER đăng ký
    // cy.wait(4000);
    // cy.get('#GameCanvas').then($canvas => {
    //   canvasAfter = $canvas[0].toDataURL();
    // })
    // .then(() => {
    //   // Step 5: So sánh canvas phải thay đổi
    //   expect(canvasBefore).not.to.eq(canvasAfter, 'Canvas phải thay đổi sau đăng ký');

    //   cy.log('✅ Canvas thay đổi sau đăng ký thành công.');
    // });

    // Step 6: Save account
    cy.then(() => {
      const userDataG = {
        account: randomStringAccount,
        password: encryptedPassword
      };
      cy.task('saveUserDataToFileG', userDataG);
      cy.log('📦 User data saved:', JSON.stringify(userDataG));
    });
  });
});
