const jwt = require("jsonwebtoken");

function genToken(user) {
  return jwt.sign(
    { username: user.username, id: user._id },
    process.env.REACT_APP_SECRET,
    {
      expiresIn: "1d",
    }
  );
}

module.exports = genToken;
