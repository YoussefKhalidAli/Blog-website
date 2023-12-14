const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = "sojifjosnfonidofhey";

const genToken = require("../../getToken");

const User = require("../../models/User");

router.post(
  "/",
  [
    check("username", "username must be at least 4 characters").isLength({
      min: 4,
    }),
    check("password", "password must be at least 6 characters/digits").isLength(
      { min: 6 }
    ),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ erros: errors.array() });
    }

    try {
      const { username, password } = req.body;
      const userFound = await User.findOne({ username });

      if (!userFound) {
        res.status(404).json("user not found");
      }

      const isMatch = await bcrypt.compare(password, userFound.password);

      if (!isMatch) {
        res.status(401).json([{ msg: "auth denied" }]);
      }

      const token = genToken(userFound);
      res.json({ msg: "succes", token });
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
);

router.post("/validate", (req, res) => {
  const { token } = req.headers;
  jwt.verify(token, SECRET, {}, async (err, info) => {
    if (err) {
      res.status(401).json(err);
    } else {
      res.status(200).json(info);
    }
  });
});
module.exports = router;
