const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: true,
    setupNodeEvents(on, config) {
      // Define custom tasks
      on('task', {
        // Save user data to a JSON file
        saveUserDataToFile(userData) {
          const filePath = path.join(__dirname, 'cypress', 'fixtures', 'userData.json');
          let existingData = [];

          // Check if the file exists, and if so, read its contents
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

          // Append the new user data to the array
          existingData.push(userData);

          // Write the updated data back to the file
          fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

          return null; // Return null to indicate the task was completed
        },

        // Save user data to a different JSON file (for 'G' variant)
        saveUserDataToFileG(userDataG) {
          const filePathG = path.join(__dirname, 'cypress', 'fixtures', 'userDataG.json');
          let existingDataG = [];

          // Check if the file exists, and if so, read its contents
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

          // Append the new user data to the array
          existingDataG.push(userDataG);

          // Write the updated data back to the file
          fs.writeFileSync(filePathG, JSON.stringify(existingDataG, null, 2));

          return null; // Return null to indicate the task was completed
        },
      });
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
