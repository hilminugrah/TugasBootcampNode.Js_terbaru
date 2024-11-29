const express = require('express');
const app = express()
const port = 3000;
const path = require('path')

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
    res.render("contact", cont);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });