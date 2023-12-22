const fs = require("fs");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const Post = require("../../models/Posts");

const auth = require("../middleWare/auth");
const { stringify } = require("querystring");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// add a post
router.post(
  "/",
  [
    auth,
    upload.single("image"),
    [
      check("title", "need title").not().isEmpty(),
      check("summary", "summary needed").not().isEmpty(),
      check("content", "content needed").not().isEmpty(),
      check("image", "image needed").not().exists(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { title, summary, content } = req.body;
    const token = req.header("x-auth-token");
    jwt.verify(token, process.env.REACT_APP_SECRET, {}, async (err, info) => {
      try {
        const post = new Post({
          title,
          summary,
          user: info.id,
          username: info.username,
          content,
          image: req.file.path,
        });

        await post.save();

        res.json(post);
      } catch (err) {
        res.status(500).json(err.message);
      }
    });
  }
);

// update  a post
router.post("/:post_id", [auth, upload.single("image")], async (req, res) => {
  const { title, content, summary } = req.body;
  const image = req.file?.path;
  try {
    await Post.updateOne(
      { _id: req.params.post_id },
      { content, title, image, summary }
    );
    res.json("updated");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get post content
router.get("/inner/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    res.json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// 5 posts per page
router.get("/all", auth, async (req, res) => {
  try {
    const { page } = req.query;
    const posts = await Post.find()
      .sort({ createdAt: "desc" })
      .skip(page * 5 - 5)
      .limit(5);
    const availablePosts = await Post.count();
    res.json([posts, availablePosts]);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get all post by author
router.get("/:author_id", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.author_id }).sort({
      createdAt: -1,
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// delete post
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const { image } = await Post.findOneAndDelete(
      { _id: req.params.post_id },
      { projection: { _id: 0, image: 1 } }
    );
    fs.unlink(`images/${image.split("\\")[1]}`, (err) => {
      if (err) console.log("err:", err);
      else {
        console.log("\nDeleted file");
      }
    });
    res.status(200).json("deleted");
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
});
module.exports = router;
