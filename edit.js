const validator = require('validator');

function validateForm(data) {
    const errors = {};

    // Validasi nama (tidak boleh kosong)
    if (validator.isEmpty(data.name || '')) {
        errors.name = 'Nama tidak boleh kosong!';
    }

    // Validasi email (format email harus valid)
    if (!validator.isEmail(data.email || '')) {
        errors.email = 'Email tidak valid!';
    }

    // Validasi mobile (harus angka dan memiliki panjang tertentu)
    if (!validator.isMobilePhone(data.mobile || '', 'id-ID')) {
        errors.mobile = 'Nomor telepon tidak valid!';
    }

    return errors;
}

module.exports = { validateForm };
