require("dotenv").config();

const redis = require("redis");

const REDIS_URL = process.env.REDIS_URL;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

console.log(REDIS_URL, REDIS_PASSWORD);
const client = redis.createClient({
  url: REDIS_URL,
  password: REDIS_PASSWORD,
});

(async () => await client.connect())();

client.on("connect", () => console.log("connected"));
