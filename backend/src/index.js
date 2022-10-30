require("dotenv").config();

const cors = require("cors");
const express = require("express");

const redisClient = require("./redis/redisClient");
const postRoutes = require("./routes/posts");
const sessionRoutes = require("./routes/sessions");

const PORT = process.env.PORT;

const app = express();

// middlewares
app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/sessions", sessionRoutes);

redisClient.client.connect();

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
