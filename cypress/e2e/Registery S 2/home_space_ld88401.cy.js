const { decrypt } = require('/Users/user/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedDomain = 'a6544976fa87713f1948c990865fe34c:6b32958501849ba6fd83d63665150a6a';
const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';

describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    cy.viewport(1920,1080)
    const domain = decrypt(encryptedDomain);
    const password = decrypt(encryptedPassword);
    //cy.visit(`https://${domain}`)  
    cy.visit(`https://${domain}`, {
      timeout: 60000 // tăng timeout nếu redirect lâu
    });
  
    // Đảm bảo trang đã load xong bằng cách chờ body hiển thị
    cy.get('body', { timeout: 60000 }).should('be.visible');
  
    // ✅ Lúc này bạn có thể tiếp tục code các lệnh sau khi trang load xong
    cy.get('.btn-signup').should('have.text', 'Đăng ký').trigger('mouseover').wait(1000).click({force:true});
    //cy.get('.btn-signup').should('have.text', 'Đăng ký').dblclick()
    const brand = 'lode88';
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
    cy.get(':nth-child(1) > .input-wrapper > .h-full').type(randomStringAccount)
    cy.get('div.relative.text-input > .input-wrapper > .h-full').type(password)
    cy.get(':nth-child(3) > .input-wrapper > .h-full').type(phoneNumber)
    cy.wait(2000)
    cy.get('.max-w-full > .w-full').contains("Đăng ký").click()
    //cy.get('.form-register > .base-button').should('be.visible').should('not.have.class','inactive').click()
    cy.get('.username').contains("sut17")

    const userData = {
      account: randomStringAccount,
      password: encryptedPassword,
      phoneNumber: generateRandomPhoneNumber()
    };
    cy.task('saveUserDataToFile',userData);
    cy.log('User data saved:', JSON.stringify(userData));

  })
})
