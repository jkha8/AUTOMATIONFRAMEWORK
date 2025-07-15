const fs = require('fs');
const path = require('path');
const { decrypt } = require('/Users/user/IdeaProjects/AUTOMATIONFRAMEWORK/cypress/support/encryptUtils.js');

const encryptedPassword = '292f05bb7ba9cfa568f8db8114d5849f:dd670c745b496aa69a0b3a98cb5b6443';

describe('Đăng nhập tự động vào web', () => {
    it('Đăng nhập vào web daily', () => {

        cy.visit('https://play.nohu1.win');
        cy.wait(7000);
        cy.get('#GameCanvas').click(350, 620, {force: true});
        //cy.wait(500);
        //cy.get('#GameCanvas').click(155, 615, {force: true});

        cy.wait(1000);

        const password = decrypt(encryptedPassword);
        const brand = 'nohu1';
        //const randomAccount = `sut17${brand}${Math.random().toString(36).substring(2, 10)}`;

        cy.get('#EditBoxId_1').type("sut17testvipkha", {force: true});
        cy.get('#EditBoxId_2').click({force: true}).type(password, {force: true});
        cy.wait(500);
        //cy.get('#EditBoxId_3').type(captchaText, {force: true});

        cy.get('#GameCanvas').click(500, 450); // nút đăng nhập
        cy.get('#EditBoxId_4', {timeout: 20000})  // đợi tối đa 20 giây cho đến khi xuất hiện
            .click({force: true})                   // click vào nếu cần
            .type('ĐN Thành Công', {force: true})

        // cy.task('saveUserDataToFileG', {
        //   account: randomAccount,
        //   password: encryptedPassword
        // });
    });
});
