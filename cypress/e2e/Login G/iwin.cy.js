const fs = require('fs');
const path = require('path');
const { decrypt } = require('/Users/user/IdeaProjects/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';

describe('Đăng nhập tự động vào web', () => {
    it('Đăng nhập vào web daily', () => {

        cy.visit('https://play.iwin.net');
        cy.wait(3000);

        cy.wait(2000);
        cy.get('#GameCanvas').click(579, 630, {force: true});
        //cy.wait(500);
        //cy.get('#GameCanvas').click(155, 615, {force: true});

        cy.wait(1000);

        const password = decrypt(encryptedPassword);
        const brand = 'iwin';
        //const randomAccount = `sut17${brand}${Math.random().toString(36).substring(2, 10)}`;

        cy.get('#EditBoxId_1').type("sut17testvipkha", {force: true});
        cy.get('#EditBoxId_2').click({force: true}).type(password, {force: true});
        cy.wait(500);
        //cy.get('#EditBoxId_3').type(captchaText, {force: true});

        cy.get('#GameCanvas').click(450, 450); // nút đăng nhập
        cy.get('#EditBoxId_3', {timeout: 20000})  // đợi tối đa 20 giây cho đến khi xuất hiện
            .click({force: true})                   // click vào nếu cần
            .type('ĐN Thành Công', {force: true})

        // cy.task('saveUserDataToFileG', {
        //   account: randomAccount,
        //   password: encryptedPassword
        // });
    });
});
