const { delay } = require("bluebird")

describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
    
  })

  it('successfully loads', () => {
    cy.viewport(1920,1080)
    cy.visit('https://soc88.com')
    //cy.get('[id="btn--login"]').dblclick()
    cy.get('.button-register').click()
    const brand = 'soc88';
    const randomStringAccount = `sut17${brand.toLowerCase()}${Math.random().toString(36).substring(2,10)}`
    function generateRandomPhoneNumber(){
      const length = Math.floor(Math.random()*2)+10;
      const prefiexes = ['03','09'];
      let phone = prefiexes[Math.floor(Math.random() * prefiexes.length)];
    
    while(phone.length < length) {
      phone += Math.floor(Math.random()*10); 
    }
    return phone;
    }
    const phoneNumber = generateRandomPhoneNumber("08");
    cy.log(randomStringAccount)
    cy.get('#username').type(randomStringAccount)
    cy.get('#password').type("Kha6868@")
    cy.get('#passwordConfirm').type("Kha6868@")
    cy.get('#phone').type(phoneNumber)
    cy.wait(2000)
    cy.get('.pt-2').click()
    //cy.get('.form-register > .base-button').should('be.visible').should('not.have.class','inactive').click()
    cy.get('#swal2-title').contains("ĐĂNG KÝ THÀNH CÔNG")

    const userData = {
      account: randomStringAccount,
      password: "Kha6868@",
      phoneNumber: generateRandomPhoneNumber()
    };
    cy.task('saveUserDataToFile',userData);
    cy.log('User data saved:', JSON.stringify(userData));

  })
})
