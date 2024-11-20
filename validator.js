const readline = require('readline');
const validator = require('validator');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('yourname', (name) => {
  rl.question('your mobile: ', (mobile) => {
    rl.question('your email', (email) => {
      const isMobileValid = validator.isMobilePhone(mobile, 'id-ID');
      const isEmailValid = validator.isEmail(email);

      console.log(`name: ${name}`);
      console.log(
        `mobile : ${mobile} (${isMobileValid ? "valid" : "invalid"})`
        )
      console.log(`email : ${email} (${isEmailValid ? "valid" : "invalid"})`);

      const contact = {
        name,
        mobile,
        email,
      };

      fs.writeFileSync("data/contact.json", JSON.stringify(contact));

      rl.close()

    });
  });
});
