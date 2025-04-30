const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js'); // 🔥 Thêm thư viện OCR

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // Define custom tasks
      on('task', {
        // Save user data to a JSON file
        saveUserDataToFile(userData) {
          const filePath = path.join(__dirname, 'cypress', 'fixtures', 'userData.json');
          let existingData = [];

          if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            try {
              existingData = JSON.parse(fileContent);
              if (!Array.isArray(existingData)) {
                existingData = [];
              }
            } catch (err) {
              existingData = [];
            }
          }

          existingData.push(userData);
          fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
          return null;
        },

        // Save user data to a different JSON file (for 'G' variant)
        saveUserDataToFileG(userDataG) {
          const filePathG = path.join(__dirname, 'cypress', 'fixtures', 'userDataG.json');
          let existingDataG = [];

          if (fs.existsSync(filePathG)) {
            const fileContent = fs.readFileSync(filePathG, 'utf8');
            try {
              existingDataG = JSON.parse(fileContent);
              if (!Array.isArray(existingDataG)) {
                existingDataG = [];
              }
            } catch (err) {
              existingDataG = [];
            }
          }

          existingDataG.push(userDataG);
          fs.writeFileSync(filePathG, JSON.stringify(existingDataG, null, 2));
          return null;
        },

        // 🔥 OCR Task để đọc ảnh captcha
        ocrImage(base64Image) {
          return new Promise((resolve, reject) => {
            Tesseract.recognize(
              Buffer.from(base64Image, 'base64'),
              'eng',
              { logger: m => console.log(m) }
            )
            .then(({ data: { text } }) => {
              // ✨ Làm gọn text OCR:
              let cleanText = text
                .replace(/[^a-zA-Z0-9]/g, '') // Chỉ giữ chữ cái (hoa + thường) và số
                .trim()                      // Trim đầu cuối
                .slice(0, 6);                 // Lấy đúng 6 ký tự đầu tiên
        
              resolve(cleanText);
            })
            .catch(err => {
              reject(err);
            });
          });
        }
      });

      return config;
    },
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
});
