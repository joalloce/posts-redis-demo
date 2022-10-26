const accessEnv = require("./helpers/accessEnv");
const redis = require("redis");

const REDIS_URL = accessEnv("REDIS_URL", "url");
const REDIS_PASSWORD = accessEnv("REDIS_PASSWORD", "password");

console.log(REDIS_URL, REDIS_PASSWORD);
const client = redis.createClient({
  url: REDIS_URL,
  password: REDIS_PASSWORD,
});
console.log("Hello");
