describe('The Home Page', () => {
  beforeEach(() => {
    // Ensure the session is reused without clearing cookies or localStorage
    // No need to clear or reset anything, the session will persist automatically
    cy.session('register-user', () => {
      const brand = '388bet';
      cy.viewport(1920, 1080);
      cy.visit('https://388bet.com');
      const randomStringAccount = `sut17${brand.toLowerCase()}${Math.random().toString(36).substring(2, 10)}`;

      function generateRandomPhoneNumber() {
        const length = Math.floor(Math.random() * 2) + 10;
        const prefixes = ['03', '09'];
        let phone = prefixes[Math.floor(Math.random() * prefixes.length)];

        while (phone.length < length) {
          phone += Math.floor(Math.random() * 10);
        }
        return phone;
      }

      const phoneNumber = generateRandomPhoneNumber();
      const randomNumber = Math.floor(Math.random() * 10);

      cy.log(randomStringAccount);
      cy.log(randomStringAccount + randomNumber);

      // Perform registration actions
      cy.get('.header__login-form > .main--primary').click();
      cy.get('.base-input__wrap > .text-lowercase').type(randomStringAccount);
      cy.get('[name="fullname"] > .base-input__wrap > input').type(randomStringAccount + randomNumber);
      cy.get('[name="password"] > .base-input__wrap > input').type("Kha6868@");
      cy.get('[name="passwordConfirm"] > .base-input__wrap > input').type("Kha6868@");
      cy.get('[name="phone"] > .base-input__wrap > input').type(phoneNumber);
      cy.wait(2000);
      cy.get('.base-button > span').click();

      // Assert successful registration
      cy.get('#swal2-title').contains("ĐĂNG KÝ THÀNH CÔNG");

      const userData = {
        account: randomStringAccount,
        password: "Kha6868@",
        phoneNumber: phoneNumber
      };

      // Save the user data to file
      cy.task('saveUserDataToFile', userData);
      cy.log('User data saved:', JSON.stringify(userData));
    });
  });

  it('successfully loads the page and stays logged in across tests', () => {
    cy.viewport(1920, 1080);
    cy.visit('https://388bet.com');
    
    // The session will be automatically restored from the previous test
    // You can add additional assertions or steps here
  });

  it('performs another test while maintaining session', () => {
    cy.viewport(1920, 1080);
    cy.visit('https://388bet.com');
    
    // This test will use the same session without re-registering or logging in
    cy.get('.header__user-info').should('exist');
  });
});
