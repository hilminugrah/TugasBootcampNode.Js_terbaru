const express = require('express');
const app = express()
const port = 3000;
const path = require('path')
const fs = require('fs')
const filefath = ('data/contact.json');
const expressLayouts = require('express-ejs-layouts');
const { title } = require('process');
const morgan = require('morgan')
app.set("view engine", "ejs");


// app.use(express.static("public"))
// app.use(morgan("dev"))


// app.use((req,res,next) => {
//   console.log("Time:",Date.now());
//   next()
// })



// Gunakan express-ejs-layouts
// app.use(expressLayouts);

// Atur folder views (opsional, default adalah './views')
// app.set('views', './views');

app.get('/', (req, res) => {
    // res.sendFile('views/index.html', { root: __dirname });
    // res.render('index')
    const nama = "hilmi nugraha"
    res.render("index", {nama})
  })

app.get("/about",(req,res) => {
    // res.sendFile('views/about.html', { root: __dirname });
    res.render('about')
})

app.get("/contact",(req,res) => {
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
  let cont = []
   if(fs.existsSync(filefath)){
    cont = JSON.parse(fs.readFileSync(filefath,'utf-8'))
   }
    res.render("contact", {cont ,title : 'halaman utama'}  );
})
// {item: cont}

  

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });