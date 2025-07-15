const fs = require('fs');
const path = require('path');
const { decrypt } = require('/Users/user/IdeaProjects/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';

describe('Đăng ký với CAPTCHA động - dùng OCR màu', () => {
  it('Tách full captcha + lọc ký tự theo màu yêu cầu', () => {
    const imgInstruction = 'instruction';
    const imgCaptcha = 'captcha';

    cy.visit('https://web.yo88.tv/');
    cy.wait(3000);

    // Bấm mở popup login
    cy.get('#GameCanvas').click(600, 440, { force: true });
    cy.wait(1000);

    // 📸 Chụp ảnh instruction hướng dẫn màu
    cy.get('#GameCanvas').screenshot(imgInstruction, {
      clip: { x: 373, y: 340, width: 300, height: 50 },
      overwrite: true
    });

    cy.readFile(`cypress/screenshots/${imgInstruction}.png`, 'base64').then((instructionBase64) => {
      cy.request('POST', 'http://localhost:5001/ocr-instruction', {
        image_base64: instructionBase64
      }).then((instructionRes) => {
        const instructionText = (instructionRes.body?.fullText || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // xóa dấu
        .toLowerCase()
        .trim();
        cy.log('📘 Hướng dẫn:', instructionText);

        const colorMatch = instructionText.match(/mau(do|xanh|den)/i);
        const colorVi = colorMatch?.[1];
        const colorMap = {
          'đỏ': 'red',
          'xanh': 'green',
          'đen': 'black'
        };
        const colorFinal = colorMap[colorVi];

        if (!colorFinal) {
          cy.log('⚠️ Không xác định được màu yêu cầu từ hướng dẫn.');
          return;
        }

        cy.log(`🎯 Màu cần chọn: ${colorFinal}`);

        // 📸 Chụp ảnh captcha ký tự
        cy.get('#GameCanvas').screenshot(imgCaptcha, {
          clip: { x: 520, y: 375, width: 150, height: 62 },
          overwrite: true
        });

        cy.readFile(`cypress/screenshots/${imgCaptcha}.png`, 'base64').then((captchaBase64) => {
          cy.request('POST', 'http://localhost:5000/solve_captcha', {
            image_base64: captchaBase64,
            color: colorFinal
          }).then((captchaRes) => {
            const fullText = captchaRes.body?.fullText || '';
            const colors = captchaRes.body?.colors || [];

            cy.log(`🔤 CAPTCHA: ${fullText}`);
            cy.log(`🌈 Màu từng ký tự: ${colors.join(', ')}`);

            if (fullText.length !== colors.length || colors.length === 0) {
              cy.log('❌ Lỗi dữ liệu captcha.');
              return;
            }

            // ✂️ Lọc ký tự theo màu yêu cầu
            const finalCaptcha = fullText
              .split('')
              .filter((char, i) => colors[i] === colorFinal)
              .join('');

            cy.log(`✏️ CAPTCHA lọc theo màu: ${finalCaptcha}`);
            cy.get('#EditBoxId_3').type(finalCaptcha, { force: true });

            // 🔐 Điền tài khoản & mật khẩu
            const password = decrypt(encryptedPassword);
            cy.get('#EditBoxId_1').type('sut17testvipkha', { force: true });
            cy.get('#EditBoxId_2').click({ force: true }).type(password, { force: true });

            // 🚀 Đăng nhập
            cy.wait(500);
            cy.get('#GameCanvas').click(480, 480);

            // ✅ Kiểm tra thành công
            cy.get('#EditBoxId_4', { timeout: 10000 })
              .click({ force: true })
              .type('ĐN Thành Công', { force: true });
          });
        });
      });
    });
  });
});
