const fs = require('fs');
const path = require('path');
const { decrypt } = require('/Users/user/IdeaProjects/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';

describe('Đăng ký với captcha động', () => {
  it('OCR tự động màu và điền captcha', () => {
    const tempInstruction = 'instruction';
    const tempCaptcha = 'tcaptcha';

    cy.visit('https://web.yo88.tv/');
    cy.wait(3000);
    cy.get('#GameCanvas').click(600, 440, { force: true });

    cy.wait(1000);
    cy.get('#GameCanvas').screenshot(tempInstruction, {
      clip: { x: 373, y: 340, width: 300, height: 50 },
      overwrite: true
    });

    cy.readFile(`cypress/screenshots/${tempInstruction}.png`, 'base64').then((instructionBase64) => {
      cy.request('POST', 'http://localhost:5001/ocr-instruction', { image: instructionBase64 }).then((res) => {
        const fullText = res.body.result.trim();
        cy.log('📘 Text nhận được:', fullText);

        const colorMatch = fullText.match(/màu (đỏ|xanh|đen)/i);
        const colorVi = colorMatch ? colorMatch[1] : null;

        if (!colorVi) {
          throw new Error('❌ Không nhận diện được màu từ instruction!');
        }

        const colorMap = {
          'đỏ': 'red',
          'xanh': 'green',
          'đen': 'black'
        };

        const colorFinal = colorMap[colorVi];
        cy.log(`🎨 Màu OCR cần đọc: ${colorFinal}`);

        // GỌP vào trong then
    cy.task('readdir', 'cypress/screenshots').then(console.log);
    const getScreenshotPath = (filename) => `cypress/screenshots/${filename}.png`;
    cy.wait(1000);
    cy.get('#GameCanvas').screenshot(tempCaptcha, {
      clip: { x: 520, y: 375, width: 150, height: 62 },
      overwrite: true
    });

    cy.wait(1000)
    cy.readFile(`cypress/screenshots/${tempCaptcha}.png`, 'base64').then((tcaptchaBase64) => {
      cy.request('POST', 'http://localhost:5001/ocr', { image: tcaptchaBase64, color: colorFinal}).then((ocrRes) => {
            const captchaText = ocrRes.body.result.trim();
            cy.log(`🔤 Captcha OCR: ${captchaText}`);
            //cy.log(`🔤 Captcha OCR: ${ocrRes}`);

            const password = decrypt(encryptedPassword);
            const brand = 'yo88';
            //const randomAccount = `sut17${brand}${Math.random().toString(36).substring(2, 10)}`;

            cy.get('#EditBoxId_1').type("sut17testvipkha", { force: true });
            cy.get('#EditBoxId_2').click({ force: true }).type(password, { force: true });
            cy.wait(500);
            cy.log(`🎨 Màu OCR cần đọc: ${colorFinal}`);
            cy.get('#EditBoxId_3').type(captchaText, { force: true });

            cy.get('#GameCanvas').click(480, 480); // nút đăng nhập
            cy.get('#EditBoxId_4', { timeout: 20000 })  // đợi tối đa 20 giây cho đến khi xuất hiện
            .click({ force: true })                   // click vào nếu cần
            .type('ĐN Thành Công', { force: true })

            // cy.task('saveUserDataToFileG', {
            //   account: randomAccount,
            //   password: encryptedPassword
            // });
          });
        });
      });
    });
  });
});
