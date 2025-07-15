describe('Tự động gửi form dự đoán 50 lần', () => {
    function generateRandomPhoneNumber() {
        const length = Math.floor(Math.random() * 2) + 10;
        const prefixes = ['03', '09'];
        let phone = prefixes[Math.floor(Math.random() * prefixes.length)];

        while (phone.length < length) {
            phone += Math.floor(Math.random() * 10);
        }
        return phone;
    }

    function generateRandomEmail() {
        const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
        let email = '';
        for (let i = 0; i < 8; i++) {
            email += chars[Math.floor(Math.random() * chars.length)];
        }
        return `${email}${Math.floor(Math.random() * 1000)}@gmail.com`;
    }

    for (let i = 1; i <= 50; i++) {
        it(`Lần ${i}: Gửi form dự đoán`, () => {
            const phoneNumber = generateRandomPhoneNumber();
            const email = generateRandomEmail();
            const predictionCount = Math.floor(Math.random() * 1000) + 1;

            cy.visit('https://kqbd.vip/mini-game/');
            cy.wait(1000);

            cy.get('#email').clear().type(email);
            cy.get('#phone').clear().type(phoneNumber);
            cy.get('#dudoan').clear().type(predictionCount);
            cy.get('.btnsubmit > .attachment-full').click();

            cy.wait(1000); // chờ để tránh gửi quá nhanh
        });
    }
});
