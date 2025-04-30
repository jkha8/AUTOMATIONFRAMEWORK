// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('solveCaptcha', (captchaSelector, inputSelector) => {
    cy.get(captchaSelector)
      .screenshot('captcha-temp', { overwrite: true }) // chụp ảnh captcha
      .then(() => {
        cy.readFile('cypress/screenshots/captcha-temp.png', 'base64').then((imgBase64) => {
          cy.request({
            method: 'POST',
            url: 'https://api.ocr.space/parse/image',
            headers: { apikey: 'helloworld' }, // API key miễn phí mẫu
            form: true,
            body: {
              base64Image: `data:image/png;base64,${imgBase64}`,
              language: 'eng',
              isOverlayRequired: false,
            }
          }).then((response) => {
            const parsedText = response.body.ParsedResults?.[0]?.ParsedText?.trim();
            if (parsedText) {
              cy.log(`🎯 Captcha đọc được: ${parsedText}`);
              cy.get(inputSelector).type(parsedText, { force: true });
            } else {
              throw new Error('🚨 OCR không đọc được captcha.');
            }
          });
        });
      });
  });
  
//   Cypress.Commands.add('solveCaptchaSmart', (options = {}) => {
//     const retries = options.retries || 3;
//     const captchaImgSelector = options.captchaImgSelector || 'img.captcha-selector';
//     const captchaInputSelector = options.captchaInputSelector || 'input.captcha-input';
//     const captchaSubmitButton = options.submitButtonSelector || 'button.submit-button';
//     const captchaRefreshButton = options.refreshButtonSelector || 'button.refresh-captcha';
  
//     function attempt(attemptNumber) {
//       if (attemptNumber > retries) {
//         throw new Error('Captcha giải sai quá số lần cho phép');
//       }
  
//       cy.get(captchaImgSelector)
//         .screenshot('captcha-temp', { overwrite: true });
  
//       cy.readFile('cypress/screenshots/captcha-temp.png', 'base64')
//         .then((base64Image) => cy.task('ocrImage', base64Image))
//         .then((captchaText) => {
//           captchaText = captchaText?.trim(); // chỉ trim khoảng trắng đầu cuối
  
//           cy.get(captchaInputSelector).clear().type(captchaText, { force: true });
//           cy.get(captchaSubmitButton).click();
  
//           cy.wait(1000); // Đợi server phản hồi
  
//           cy.get('body').then($body => {
//             const bodyText = $body.text();
//             if (bodyText.includes('Captcha không hợp lệ.') || bodyText.includes('Sai mã xác nhận')) {
//               cy.log(`🔄 Captcha sai lần ${attemptNumber}, thử lại...`);
//               cy.get('.close > img').click() // tắt bảng thông báo
//               cy.get(captchaRefreshButton).click();
//               cy.wait(1000); // Đợi captcha mới load
//               attempt(attemptNumber + 1);
//             } else {
//               cy.log('✅ Captcha đúng!');
//             }
//           });
//         });
//     }
  
//     attempt(1); // Start từ lần 1
//   });

// Cypress.Commands.add('solveCaptchaSmart', (options = {}) => {
//     const retries = options.retries || 3;
//     const captchaImgSelector = options.captchaImgSelector || 'img.captcha-selector';
//     const captchaInputSelector = options.captchaInputSelector || 'input.captcha-input';
//     const captchaSubmitButton = options.submitButtonSelector || 'button.submit-button';
//     const captchaRefreshButton = options.refreshButtonSelector || 'button.refresh-captcha';
//     const closeNotificationButtonSelector = options.closeNotificationButtonSelector || null;
//     const waitAfterSubmit = options.waitAfterSubmit || 1500;
  
//     function attempt(attemptNumber) {
//       if (attemptNumber > retries) {
//         throw new Error('❌ Captcha giải sai quá số lần cho phép.');
//       }
  
//       cy.url().then((oldUrl) => {  // Ghi nhận URL hiện tại trước OCR
//         cy.get(captchaImgSelector)
//           .screenshot('captcha-temp', { overwrite: true });
  
//         cy.readFile('cypress/screenshots/captcha-temp.png', 'base64')
//           .then((base64Image) => cy.task('ocrImage', base64Image))
//           .then((captchaText) => {
//             captchaText = captchaText?.trim();
  
//             if (!captchaText || captchaText.length !== 6) {
//               cy.log(`⚠️ Captcha nhận diện được: "${captchaText}" (${captchaText?.length || 0} ký tự). Refresh lại...`);
//               cy.get(captchaRefreshButton).click({ force: true });
//               cy.wait(1000);
//               attempt(attemptNumber + 1);
//               return;
//             }
  
//             cy.get(captchaInputSelector).clear().type(captchaText, { force: true });
//             cy.get(captchaSubmitButton).click({ force: true });
  
//             cy.wait(waitAfterSubmit);
  
//             cy.url().then((newUrl) => {
//               if (newUrl !== oldUrl) {
//                 const oldOrigin = new URL(oldUrl).origin;
//                 const newOrigin = new URL(newUrl).origin;
  
//                 if (oldOrigin !== newOrigin) {
//                   cy.log('🌐 Đã chuyển domain, sử dụng cy.origin.');
  
//                   cy.origin(newOrigin, () => {
//                     cy.url().should('include', newOrigin);
//                     cy.log('✅ Captcha đúng! Và domain đã chuyển.');
//                     // Các lệnh sau khi chuyển domain bạn có thể thêm tiếp ở đây nếu cần
//                   });
//                 } else {
//                   cy.log('✅ Captcha đúng! Không đổi domain.');
//                 }
//               } else {
//                 cy.get('body').then($body => {
//                   const bodyText = $body.text();
//                   if (bodyText.includes('Vượt quá giới hạn truy cập') || bodyText.includes('Vui lòng thử lại sau')) {
//                     throw new Error('🚫 Vượt quá giới hạn truy cập, dừng quá trình solve captcha.');
//                   }

//                   if (bodyText.includes('Captcha không hợp lệ.') || bodyText.includes('Sai mã xác nhận')) {
//                     cy.log(`🔄 Captcha sai lần ${attemptNumber}, refresh và thử lại.`);
//                     cy.get(closeNotificationButtonSelector).click() // tắt bảng thông báo
//                     cy.get(captchaRefreshButton).click({ force: true });
//                     cy.wait(1000);
//                     attempt(attemptNumber + 1);
//                   } else {
//                     cy.log('✅ Captcha đúng! Nhưng chưa chuyển trang.');
//                   }
//                 });
//               }
//             });
//           });
//       });
//     }
  
//     attempt(1);
//   });
Cypress.Commands.add('solveCaptchaSmartOnce', (options = {}) => {
    const captchaImgSelector = options.captchaImgSelector || 'img.captcha-selector';
    const captchaInputSelector = options.captchaInputSelector || 'input.captcha-input';
    const captchaSubmitButton = options.submitButtonSelector || 'button.submit-button';
    const waitAfterSubmit = options.waitAfterSubmit || 1500;
  
    cy.url().then((oldUrl) => {
      cy.get(captchaImgSelector).screenshot('captcha-temp', { overwrite: true });
  
      cy.readFile('cypress/screenshots/captcha-temp.png', 'base64')
        .then((base64Image) => cy.task('ocrImage', base64Image))
        .then((captchaText) => {
          captchaText = captchaText?.trim();
  
          if (!captchaText || captchaText.length !== 6) {
            throw new Error(`❌ Captcha nhận dạng không đúng hoặc không đủ 6 ký tự: "${captchaText}"`);
          }
  
          cy.get(captchaInputSelector).clear().type(captchaText, { force: true });
          cy.get(captchaSubmitButton).click({ force: true });
  
          cy.wait(waitAfterSubmit);
  
          cy.url().then((newUrl) => {
            cy.log(`🌐 Old URL: ${oldUrl}`);
            cy.log(`🌐 New URL: ${newUrl}`);
  
            if (newUrl === oldUrl) {
              throw new Error('❌ Không chuyển trang sau khi submit captcha. Có thể captcha sai hoặc các lỗi hệ thống khác.');
            } else {
              cy.log('✅ Captcha đúng – đã chuyển trang.');
            }
          });
        });
    });
  });


  Cypress.Commands.add('solveCaptchaSmart', (options = {}) => {
    const captchaImgSelector = options.captchaImgSelector || 'img.captcha-selector';
    const captchaInputSelector = options.captchaInputSelector || 'input.captcha-input';
    const captchaSubmitButton = options.submitButtonSelector || 'button.submit-button';
    const waitAfterSubmit = options.waitAfterSubmit || 1500;
  
    cy.url().then((oldUrl) => {
      const oldOrigin = new URL(oldUrl).origin;
      const oldPath = new URL(oldUrl).pathname;
  
      cy.get(captchaImgSelector).screenshot('captcha-temp', { overwrite: true });
  
      cy.readFile('cypress/screenshots/captcha-temp.png', 'base64')
        .then((base64Image) => cy.task('ocrImage', base64Image))
        .then((captchaText) => {
          captchaText = captchaText?.trim();
  
          if (!captchaText || captchaText.length !== 6) {
            throw new Error(`❌ Captcha sai hoặc không đủ 6 ký tự: "${captchaText}"`);
          }
  
          cy.get(captchaInputSelector).clear().type(captchaText, { force: true });
          cy.get(captchaSubmitButton).click({ force: true });
  
          cy.wait(waitAfterSubmit);
  
          cy.url().then((newUrl) => {
            const newOrigin = new URL(newUrl).origin;
            const newPath = new URL(newUrl).pathname;
  
            cy.log(`🌐 Old URL: ${oldUrl}`);
            cy.log(`🌐 New URL: ${newUrl}`);
  
            if (newOrigin !== oldOrigin) {
              cy.log('✅ Đã chuyển domain – captcha đúng.');
            } else if (newPath !== oldPath) {
              cy.log('✅ Cùng domain nhưng đã chuyển path – captcha đúng.');
            } else {
              throw new Error('❌ Không chuyển trang (path & domain giữ nguyên) – có thể captcha sai hoặc lỗi hệ thống(vượt quá giới hạn hoặc đăng ký quá nhiều tài khoản.).');
            }
          });
        });
    });
  });
  