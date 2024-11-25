const fs = require('fs');
const yargs = require('yargs');

// Fungsi untuk membaca data JSON
const loadData = () => {
  try {
    const dataBuffer = fs.readFileSync('data/contact.json');
    return JSON.parse(dataBuffer.toString());
  } catch (error) {
    return []; // Jika file tidak ada atau kosong
  }
};

// Fungsi untuk menyimpan data ke file JSON
const saveData = (data) => {
  fs.writeFileSync('data/contact.json', JSON.stringify(data, null, 2));
};

// Konfigurasi perintah 'add' di yargs
yargs.command({
  command: 'add',
  describe: 'Tambah kontak baru',
  builder: {
    name: {
      describe: 'Nama kontak',
      demandOption: true,
      type: 'string',
    },
    phone: {
      describe: 'Nomor HP',
      demandOption: true,
      type: 'string',
    },
    email: {
      describe: 'Email kontak',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    const data = loadData();

    // Periksa apakah nama sudah ada
    const isNameExist = data.some((contact) => contact.name.toLowerCase() === argv.name.toLowerCase());

    if (isNameExist) {
      console.log(` Nama "${argv.name}" sudah ada dalam kontak. Data tidak dapat ditambahkan.`);
      return;
    }

    // Tambahkan data baru
    data.push({
      nama: argv.name,
      nohp: argv.phone,
      email: argv.email,
    });

    // Simpan data
    saveData(data);

    console.log(`Kontak dengan nama "${argv.nama}" berhasil ditambahkan.`);
  },
});

// Parsing argumen
yargs.parse();
