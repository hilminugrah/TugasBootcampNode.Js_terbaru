const funct = require("./funct");
const yargs = require("yargs");
const fs = require("fs");

yargs.command({
  command: "add",
  describe: "add new contact",
  builder: {
    name: {
      describe: "contact name",
      demandOption: true,
      type: "string",
    },
    mobile: {
      describe: "contact mobile",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "contact email",
      demandOption: false,
      type: "string",
    },
  },
  handler(argv) {
    const contact = {
      name: argv.name,
      mobile: argv.mobile,
      email: argv.email,
    };
    funct.newContact(contact);
    console.log(contact);
  },
});

yargs.parse();


// Fungsi untuk menghapus item dari file JSON
const deleteItem = (name) => {
    const filePath = "data/contact.json";

    // Periksa apakah file JSON ada
    if (!fs.existsSync(filePath)) {
        console.log("File tidak ditemukan.");
        return;
    }

    // Baca data dari file JSON
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Cari dan hapus item berdasarkan nama
    const newData = data.filter((item) => item.name !== name);

    if (data.length === newData.length) {
        console.log(` ${name} tidak ditemukan.`);
    } else {
        fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
        console.log(`Item dengan ${name} berhasil dihapus.`);
    }
};


// Konfigurasi Yargs
yargs
    .command({
        command: "delete",
        describe: "Hapus item berdasarkan nama",
        builder: {
            name: {
                describe: "nama item yang ingin dihapus",
                demandOption: true,
                type: "string",
            },
        },
        handler(argv) {
            deleteItem(argv.name);
        },
    })

    

    //Konfigurasi yargs
    yargs.command({
      command: 'list',
      describe: 'List data from JSON',
      handler: () => {
        // Baca file JSON
        fs.readFile('data/contact.json', 'utf8', (err, data) => {
          if (err) {
            console.error('Gagal membaca file:', err);
            return;
          }
    
          // Parse JSON
          const jsonData = JSON.parse(data);
    
          // Tampilkan data di terminal
          console.log('Data dari JSON:');
          jsonData.forEach((item, index) => {
            console.log(`No: ${index + 1}, name: ${item.name}, phone: ${item.phone}, email: ${item.email}`);
          });
        });
      },
    });
    
    // Parsing argumen
    yargs.parse();


    // Fungsi untuk membaca data JSON
const loadData = () => {
  try {
    const dataBuffer = fs.readFileSync('data/contact.json');
    return JSON.parse(dataBuffer.toString());
  } catch (error) {
    return []; // Jika file tidak ditemukan atau kosong
  }
};

// Konfigurasi perintah 'detail' di yargs
yargs.command({
  command: 'detail',
  describe: 'Cek detail data berdasarkan nama',
  builder: {
    name: {
      describe: 'nama dari data yang ingin dicek',
      demandOption: true,
      type:"string",
    },
  },
  handler: (argv) => {
    const data = loadData();

    // Cari data berdasarkan nama
    const detail = data.find((item) => item.name === argv.name);

    if (detail) {
      console.log('Detail Data Ditemukan:');
      console.log(`name: ${detail.name}`);
      console.log(`phone: ${detail.phone}`);
      console.log(`email: ${detail.email}`);
    } else {
      console.log(`Data dengan name ${argv.name} tidak ditemukan.`);
    }
  },
});

// Parsing argumen
yargs.parse();

// Fungsi untuk membaca data JSON
const Data = () => {
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

// Konfigurasi perintah 'update' di yargs
yargs.command({
  command: 'update',
  describe: 'Update data berdasarkan nama',
  builder: {
    name: {
      describe: 'data yang ingin diupdate',
      demandOption: true,
      type: 'string',
    },
    phone: {
      describe: 'Nama baru untuk phone',
      type: 'string',
    },
    email: {
      describe: 'email baru',
      type: 'string',
    },
  },
  handler: (argv) => {
    const data = Data();

    // Cari data berdasarkan nama
    const index = data.findIndex((item) => item.name === argv.name);

    if (index !== -1) {
      // Perbarui data
      if (argv.name) data[index].name = argv.name;
      if (argv.phone) data[index].phone = argv.phone;
      if (argv.email) data[index].email = argv.email;


      // Simpan perubahan
      saveData(data);

      console.log(`Data dengan  ${argv.name} berhasil diperbarui.`);
      console.log(data[index]);
    } else {
      console.log(`Data dengan  ${argv.name} tidak ditemukan.`);
    }
  },
});

// Parsing argumen
yargs.parse();





