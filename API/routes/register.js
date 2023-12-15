const express = require("express");

const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const genToken = require("../../getToken");

const User = require("../../models/User");

// register an account
router.post(
  "/",
  [
    check("username", "username is required").not().isEmpty(),
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
      const { username, email, password } = req.body;

      const user = new User({
        username,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const token = genToken(user);
      res.json({ msg: "succes", token });
    } catch (err) {
      res.json(err.message);
    }
  }
);

module.exports = router;
