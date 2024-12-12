const express = require('express');
const app = express();
const port = 2000;
const path = require('path');
const fs = require('fs');
const filefath = 'data/contact.json';
const expressLayouts = require('express-ejs-layouts');
const { title } = require('process');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const router = express.Router();
const validator = require('validator')
// const sequelize = require('./database');
// const contactRoutes = require('./routesKontak');
// const { validateInput } = require('./validate');

// const { validateForm } = require('create');



// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


// Path to data file
const dataFile = path.join(__dirname, "data", "contact.json");

// Helper function to read and write JSON
const readData = () => JSON.parse(fs.readFileSync(dataFile));
const writeData = (data) => fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

//validasi
// File JSON untuk menyimpan data kontak
const CONTACTS_FILE = './data/contact.json';

// Fungsi untuk membaca data dari contact.json
const getContacts = () => {
  const data = fs.readFileSync(CONTACTS_FILE);
  return JSON.parse(data);
};

// Fungsi untuk menyimpan data ke contact.json
const saveContacts = (contacts) => {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
};

// Route untuk menampilkan form create
app.get('/create', (req, res) => {
  res.render('create');
});

// Route untuk menambahkan kontak baru
app.post('/create', (req, res) => {
  const { name, mobile, email } = req.body;
  const contacts = getContacts();

  // Validasi Nama Unik
  const isNameExist = contacts.some(contact => contact.name === name);
  if (isNameExist) {
    return res.send('Error: Nama sudah terdaftar!');
  }

  // Validasi Nomor Indonesia
  if (!validator.isMobilePhone(mobile, 'id-ID')) {
    return res.send('Error: Nomor telepon harus nomor Indonesia yang valid!');
  }

  // Validasi Email
  if (!validator.isEmail(email)) {
    return res.send('Error: Email tidak valid!');
  }

  // Tambahkan data ke JSON
  const newContact = {
    id: contacts.length + 1,
    name,
    mobile,
    email,
  };
  contacts.push(newContact);
  saveContacts(contacts);

  res.send('Kontak berhasil ditambahkan!');
});

// Route untuk menampilkan form edit
app.get('edit/:id', (req, res) => {
  const contacts = getContacts();
  const contact = contacts.find(c => c.id === parseInt(req.params.id));
  if (!contact) return res.send('Kontak tidak ditemukan!');
  res.render('edit', { contact });
});

// Route untuk mengedit kontak
app.post('edit/:id', (req, res) => {
  const { id } = req.params;
  const { name, mobile, email } = req.body;
  const contacts = getContacts();

  // Validasi Nama Unik (kecuali nama saat ini)
  const isNameExist = contacts.some(contact => contact.name === name && contact.id !== parseInt(id));
  if (isNameExist) {
    return res.send('Error: Nama sudah terdaftar!');
  }

  // Validasi Nomor Indonesia
  if (!validator.isMobilePhone(mobile, 'id-ID')) {
    return res.send('Error: Nomor telepon harus nomor Indonesia yang valid!');
  }

  // Validasi Email
  if (!validator.isEmail(email)) {
    return res.send('Error: Email tidak valid!');
  }

  // Update data di JSON
  const contactIndex = contacts.findIndex(c => c.id === parseInt(id));
  if (contactIndex !== -1) {
    contacts[contactIndex] = { id: parseInt(id), name, mobile, email };
    saveContacts(contacts);
    res.send('Kontak berhasil diupdate!');
  } else {
    res.send('Kontak tidak ditemukan!');
  }
});
//end validasi

// Routes
app.get("/", (req, res) => {
  const users = readData();
  res.render("index", { users });
});
// validasi create
// app.post('/create', validateInput, (req, res) => {
//   const { id , name, mobile, email } = req.body;

//   const data = require('./data/contact.json');
//   data.push({id , name, mobile, email });

//   // Simpan kembali ke file JSON
//   fs.writeFileSync('./data/contact.json', JSON.stringify(data, null, 2));

//   res.send('Data berhasil ditambahkan!');
// });
// // end validasi create

// // validasi add
// app.post('/edit/:id', validateInput, (req, res) => {
//   const { id } = req.params;
//   const { name, mobile, email } = req.body;

//   const data = require('./data/contact.json');
//   const index = data.findIndex(item => item.id === id);

//   if (index === -1) {
//       return res.status(404).send('Data tidak ditemukan!');
//   }

//   // Update data
//   data[index] = { name, mobile, email };

//   // Simpan kembali ke file JSON
//   const fs = require('fs');
//   fs.writeFileSync('./data/contact.json', JSON.stringify(data, null, 2));

//   res.send('Data berhasil diperbarui!');
// });

//end validasi add

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create",  (req, res) => {;
  const users = readData();
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
  };
  users.push(newUser);
  writeData(users);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const users = readData();
  const user = users.find((u) => u.id == req.params.id);
  res.render("edit", { user });
});

app.post("/edit/:id", (req, res) => { 
  // const { name, mobile, email } = req.body;
  // const errors = validateForm({ name, mobile, email });

  // if (Object.keys(errors).length > 0) {
  //     // Jika ada error, tampilkan form kembali dengan pesan error
  //     return res.render('add', { errors, data: { name, mobile, email } });
  // }
  const users = readData();
  const userIndex = users.findIndex((u) => u.id == req.params.id);
  if (userIndex > -1) {
    users[userIndex] = {
      id: users[userIndex].id,
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
    };
    writeData(users);
  }
  res.redirect("/");
});

// app.post('/delete/:id', (req, res) => {//   
//   const { id } = req.params; // Ambil ID dari parameter URL
//   const data = require('./data/contact.jsonjson'); // Ambil data dari file JSON

//   // Cari index data berdasarkan ID
//   const index = data.findIndex(item => item.id === id);

//   if (index === -1) {
//       return res.status(404).send('Data tidak ditemukan!');
//   }

//   // Hapus data dari array
//   data.splice(index, 1);

//   // Simpan kembali ke file JSON
//   const fs = require('fs');
//   fs.writeFileSync('./data/contact.json', JSON.stringify(data, null, 2));

//   res.send('Data berhasil dihapus!');
// });



 app.post("/delete/:id", (req, res) => {
  const users = readData();
   const filteredUsers = users.filter((u) => u.id != req.params.id);
   writeData(filteredUsers);
   res.redirect("/");
 });

// app.get("detail" , (req,res) => {
//   const users = readData();
//   const filtered = users.filter((u) => u.id != req.params.id);
//   writeData(filtered);
//   res.redirect("/")
// })

// app.use(express.static("public"))
// app.use(morgan("dev"))

// app.use((req,res,next) => {
//   console.log("Time:",Date.now());
//   next()
// })

// Gunakan express-ejs-layouts
// app.use(expressLayouts);

// app.set('layout', 'layout/layout');




//  app.get('/', (req, res) => {
//    res.sendFile('views/index.html', { root: __dirname });
//    res.render('index')
//    const nama = 'hilmi nugraha';
//    res.render('index', { nama });
//  });

app.get('/about', (req, res) => {
  res.sendFile('views/about.html', { root: __dirname });
  res.render('about');
});

app.get('/contact' , (req, res) => {
  res.sendFile('views/contact.html', { root: __dirname});
  res.render('contact')
})

 app.get('/contact', (req, res) => {
   res.sendFile('views/contact.html', { root: __dirname });
   res.render('contact')
     cont = [{
       nama: "hilmi",
        mobile: "0812232433",
    },
     {
       nama: "hilmi",
       mobile: "0812232433",
   },
    {
       nama: "hilmi",
        mobile: "081223243[3",
    }
     ]
  let cont = []
   if(fs.existsSync(filefath)){
    cont = JSON.parse(fs.readFileSync(filefath,'utf-8'))
    }
    cont = JSON.parse(fs.readFileSync(filefath, 'utf-8'));
   res.render('contact', {item: cont}  );
 });
//  {item: cont}
//  { cont, title ; 'contact' }

// app.use ((req,res)=>{
//   req.send('not found 404')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// module.exports = router;