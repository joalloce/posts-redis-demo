const axios = require("axios");
const client = require("../redis/redisClient").client;

const getPost = async (req, res) => {
  const { id } = req.params;

  // get the post from redis
  const cachedPost = await client.get(`post-${id}`);

  if (cachedPost) {
    return res.json(JSON.parse(cachedPost));
  }

  // otherwise get the data
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  //save post in redis for 1 hour
  client.set(`post-${id}`, JSON.stringify(response.data), { EX: 60 * 60 });

  return res.json(response.data);
};

const getPosts = async (req, res) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/`
  );

  return res.json(response.data);
};

// check and uncheck a post
const savePost = async (req, res) => {
  const { id } = req.params;

  let savedPost = await client.get(`saved-${id}`);

  // opposite
  let opposite;
  if (savedPost === "1") {
    opposite = "0";
    await client.publish("counter subtract 1", id);
  } else {
    opposite = "1";
    await client.publish("counter add 1", id);
  }

  await client.set(`saved-${id}`, opposite);

  return res.json(opposite);
};

module.exports = {
  getPost,
  getPosts,
  savePost,
};
