const http = require('http');
const fs = require('fs');


http
  .createServer((req, res) => {
    const url = req.url;
    console.log(url)
    
    const renderHtml = (path, res) => {
    fs.readFile(path, (err,data) => {    
        if (url === '/about') {
            renderHtml(".views/about.html", res)
            } else if (url === '/contact') {
            renderHtml(".views/contact.html", res)
            } else {
              res.writeHead(200, { 'content-type': 'text/html' });
              res.write('hello world');
              res.end();
            }
    })
    }

    
  })
  .listen(3000, () => {
    console.log('server is running on port 3000');
  });
