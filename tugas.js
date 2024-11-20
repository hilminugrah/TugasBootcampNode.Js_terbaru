const readline = require('readline');
const validator = require('validator');

// Membuat antarmuka readline untuk membaca input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Fungsi untuk meminta input
const askQuestion = (question) => {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
};

(async () => {
    try {
        // Meminta input email
        const email = await askQuestion('Masukkan email Anda: ');

        // Validasi email
        if (validator.isEmail(email)) {
            console.log('Email valid!');
        } else {
            console.log('Email tidak valid.');
        }

        // Meminta input nomor telepon
        const phone = await askQuestion('Masukkan nomor telepon Anda: ');

        // Validasi nomor telepon (misalnya format Indonesia)
        if (validator.isMobilePhone(phone, 'id-ID')) {
            console.log('Nomor telepon valid!');
        } else {
            console.log('Nomor telepon tidak valid.');
        }

    } catch (err) {
        console.error('Terjadi kesalahan:', err);
    } finally {
        rl.close(); // Menutup antarmuka readline
    }
})();

 


