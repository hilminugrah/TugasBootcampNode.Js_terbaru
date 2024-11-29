const express = require('express');
const app = express()
const port = 3000;
const path = require('path')
const fs = require('fs')
const filefath = ('data/contact.json');

app.set("view engine", "ejs");

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
    res.render("contact", {item: cont});
})

  

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });