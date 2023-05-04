const jwt = require("jsonwebtoken");
const { token } = require("morgan");

const createToken = (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, process.env.JWT_KEY, (err, token) => {
      if (err) {
        reject;
      } else {
        resolve(token);
      }
    });
  });
};

// const createToken = jwt.sign(
//   { data:  },
//   process.env.JWT_KEY,
//   { algorithm: "RS256" },
//   function (err, token) {
//     console.log(token);
//   }
// );

module.exports = { createToken };
