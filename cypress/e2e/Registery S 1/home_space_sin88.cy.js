describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
  })

  it('successfully loads', () => {
    cy.visit('https://sin88.com');
    cy.document().then((doc) =>{
      const btn = doc.querySelector('#onsignal-slidedown-allow-button');
      if (btn && btn.offsetParent !== null){
        cy.wrap(btn).click();
        cy.log('Đã click nút thông báo OneSignal');
      } else {
        cy.log('Không có popup OneSingal bỏ qua');
      }
    });
    cy.get('.header__auth-register > .btn > .base-button--content').click()
    const brand = 'Sin88';
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
    cy.get('.box-content > :nth-child(1) > .base-input > .base-input__wrap > .base-input__wrap-input > .imask').type(randomStringAccount)
    cy.get('.box-content > :nth-child(2) > .base-input > .base-input__wrap > .base-input__wrap-input > .imask').type(phoneNumber)
    cy.get(':nth-child(3) > .base-input > .base-input__wrap > .base-input__wrap-input > .imask').type("Kha6868@")
    cy.get('.mb-23 > .base-input > .base-input__wrap > .base-input__wrap-input > .imask').type("Kha6868@")
    cy.wait(500);
    cy.get('.form-login__wrap-content > :nth-child(2) > .btn').should('be.visible').should('not.have.class','inactive').click()
    //cy.get('.form-login__wrap-content > :nth-child(2) > .btn > .base-button--content').should('be.visible').and('not.be.disabled').click()
    cy.get(':nth-child(2) > .account-tabs__nav > .nav-item.active > .nav-link > .tab-content > .label').should('be.visible');

    const userData = {
      account: randomStringAccount,
      password: "Kha6868@",
      phoneNumber: generateRandomPhoneNumber()
    };
    cy.task('saveUserDataToFile',userData);
    cy.log('User data saved:', JSON.stringify(userData));

  })
})
