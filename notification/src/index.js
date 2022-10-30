require("dotenv").config();

const redisClient = require("./redis/redisClient");

// when connected, subcribe to an event from backend and print the message.
redisClient.client.connect().then(() => {
  redisClient.client.subscribe("counter subtract 1", (message) =>
    console.log(`post with the id ${message} was unsaved`)
  );
  redisClient.client.subscribe("counter add 1", (message) =>
    console.log(`post with the id ${message} was saved`)
  );
});
