const jwt = require("jsonwebtoken");
const SECRET = "sojifjosnfonidofhey";
function genToken(user) {
  return jwt.sign({ username: user.username, id: user._id }, SECRET, {
    expiresIn: "1d",
  });
}

module.exports = genToken;
