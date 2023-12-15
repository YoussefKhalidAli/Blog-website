const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "auth denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.REACT_APP_SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
};
