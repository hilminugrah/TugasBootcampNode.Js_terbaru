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

    // Cari dan hapus item berdasarkan ID
    const newData = data.filter((item) => item.name !== name);

    if (data.length === newData.length) {
        console.log(`ID ${name} tidak ditemukan.`);
    } else {
        fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
        console.log(`Item dengan ID ${name} berhasil dihapus.`);
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
    .help()
    .argv;