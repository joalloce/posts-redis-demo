require("dotenv").config();

const redisClient = require("./redis/redisClient");

redisClient.client.connect().then(() => {
  redisClient.client.subscribe("counter subtract 1", (message) =>
    console.log(`post with the id ${message} was unsaved`)
  );
  redisClient.client.subscribe("counter add 1", (message) =>
    console.log(`post with the id ${message} was saved`)
  );
});
