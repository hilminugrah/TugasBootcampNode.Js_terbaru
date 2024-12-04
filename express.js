const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
const filefath = 'data/contact.json';
const expressLayouts = require('express-ejs-layouts');
const { title } = require('process');
const morgan = require('morgan');
const bodyParser = require("body-parser");


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');

// Path to data file
const dataFile = path.join(__dirname, "data", "contact.json");

// Helper function to read and write JSON
const readData = () => JSON.parse(fs.readFileSync(dataFile));
const writeData = (data) => fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

// Routes
app.get("/", (req, res) => {
  const users = readData();
  res.render("index", { users });
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create", (req, res) => {
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

app.post("/delete/:id", (req, res) => {
  const users = readData();
  const filteredUsers = users.filter((u) => u.id != req.params.id);
  writeData(filteredUsers);
  res.redirect("/");
});

// app.use(express.static("public"))
// app.use(morgan("dev"))

// app.use((req,res,next) => {
//   console.log("Time:",Date.now());
//   next()
// })

// Gunakan express-ejs-layouts
// app.use(expressLayouts);

// app.set('layout', 'layout/layout');




// app.get('/', (req, res) => {
  // res.sendFile('views/index.html', { root: __dirname });
  // res.render('index')
//   const nama = 'hilmi nugraha';
//   res.render('index', { nama });
// });

// app.get('/about', (req, res) => {
  // res.sendFile('views/about.html', { root: __dirname });
//   res.render('about');
// });

// app.get('/contact', (req, res) => {
  // res.sendFile('views/contact.html', { root: __dirname });
  // res.render('contact')
  //   cont = [{
  //      nama: "hilmi",
  //      mobile: "0812232433",
  //   },
  //   {
  //     nama: "hilmi",
  //     mobile: "0812232433",
  //  },
  //  {
  //     nama: "hilmi",
  //      mobile: "081223243[3",
  //  }
  //   ]
//   let cont = []
//    if(fs.existsSync(filefath)){
//     cont = JSON.parse(fs.readFileSync(filefath,'utf-8'))
//    }
//    cont = JSON.parse(fs.readFileSync(filefath, 'utf-8'));
//   res.render('contact', {item: cont} );
// });
// {item: cont}
// { cont, title: 'contact' }

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
