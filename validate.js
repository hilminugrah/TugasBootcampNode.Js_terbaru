const phoneRegex = /^08\d{8,11}$/;

const validateInput = (req, res, next) => {
    const { nama, mobile } = req.body;

    // Ambil data dari JSON
    const data = require('./data/contact.json'); // Pastikan path ke file JSON benar

    // Validasi nama sudah ada
    const nameExists = data.some(item => item.name === nama);
    if (nameExists) {
        return res.status(400).send('Nama sudah ada, gunakan nama lain!');
    }

    // Validasi nomor HP Indonesia
    if (!phoneRegex.test(mobile)) {
        return res.status(400).send('Nomor HP tidak valid! Harus format Indonesia.');
    }

    next();
};

module.exports = { validateInput };
