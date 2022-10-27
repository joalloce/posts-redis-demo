const { promisifyAll } = require("bluebird");
const redis = require("redis");

promisifyAll(redis);

// enviroment variables
const REDIS_URL = process.env.REDIS_URL;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

// connection
const client = redis.createClient({
  url: REDIS_URL,
  password: REDIS_PASSWORD,
});

// print on an event
client.on("connect", () => console.log("connected"));
client.on("error", (err) => console.log(err));

module.exports.client = client;
