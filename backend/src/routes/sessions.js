const express = require("express");

const {
  checkSession,
  createSession,
  deleteSession,
} = require("../controllers/SessionController");

const router = express.Router();

router.get("/:session", checkSession);
router.post("/", createSession);
router.delete("/:session", deleteSession);

module.exports = router;
