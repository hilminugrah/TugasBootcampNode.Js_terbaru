const fs = require('fs');

//membca file txt
fs.readfile('test.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data)
})

// 