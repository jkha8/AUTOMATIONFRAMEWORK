describe('Tự động giải CAPTCHA canvas', () => {
  Cypress.Commands.add("solveCaptchaFromCanvas", (canvasSelector, inputSelector) => {
    cy.get(canvasSelector).then(($canvas) => {
      const canvas = $canvas[0];
      const base64 = canvas.toDataURL("image/png");

      cy.request("POST", "http://localhost:5000/solve", {
        image: base64
      }).then((res) => {
        const captcha = res.body?.captcha;
        const instr = res.body?.instruction;
        const rawText = res.body?.instruction_text;
        cy.log("📥 Captcha:", captcha);
        cy.log("🎯 Chọn màu:", instr);
        cy.log("📝 Hướng dẫn:", rawText);

        cy.get(inputSelector).type(captcha, { delay: 100 });
      });
    });
  });

  it('Giải CAPTCHA từ canvas và nhập tự động', () => {
    cy.visit('https://web.yo88.tv/'); // TODO: thay bằng URL thật

    // Đợi canvas load
    cy.get('canvas').should('be.visible');
    cy.wait(3000);
    cy.get('#GameCanvas').click(600, 440, { force: true });
    cy.wait(1000);

    // Gọi custom command
    cy.solveCaptchaFromCanvas('canvas', '#captcha-input'); // TODO: sửa selector nếu cần
  });
});
