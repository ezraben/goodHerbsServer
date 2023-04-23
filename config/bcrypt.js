const bcrypt = require("bcryptjs");

const createHash = (password) => {
  return bcrypt.hash(password, 10);
};

// bcrypt.genSalt(10, function (err, salt) {
//   bcrypt.hash("B4c0//", salt, function (err, hash) {
//     // Store hash in your password DB.
//   });
// });

const compareHash = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = {
  createHash,
  compareHash,
};
