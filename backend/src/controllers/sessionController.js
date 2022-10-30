const client = require("../redis/redisClient").client;
const { generateUUID } = require("../helpers/generateUUID");

const checkSession = async (req, res) => {
  const { session } = req.params;

  const user = await client.get(`session-${session}`);
  if (!user) {
    return res.json({ error: "Invalid Session" });
  }

  return res.json({ session, user });
};

const createSession = async (req, res) => {
  if (!req.body.user) {
    return next(new Error("Invalid body"));
  }

  const user = req.body.user;
  const uuid = generateUUID();

  client.set(`session-${uuid}`, user, { EX: 60 * 60 }); // 1 hour session

  return res.json({ session: uuid, user });
};

const deleteSession = async (req, res) => {
  const { session } = req.params;

  const user = await client.get(`session-${session}`);
  if (!user) {
    return res.json({ error: "Invalid Session" });
  }

  client.set(`session-${session}`, "", { EX: 0 });

  return res.json({ session });
};

module.exports = {
  checkSession,
  createSession,
  deleteSession,
};
