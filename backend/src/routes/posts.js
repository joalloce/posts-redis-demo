const express = require("express");

const {
  getPost,
  getPosts,
  savePost,
} = require("../controllers/postController");

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.put("/:id", savePost);

module.exports = router;
