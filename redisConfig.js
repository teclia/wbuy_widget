require("dotenv").config();
const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || null,
});

redis.on("connect", () => {
  console.log("------------------------------")
  console.log("- Redis conectado")
  console.log("------------------------------")

});

redis.on("error", (err) => {
  console.log("------------------------------")
  console.log("- Redis error")
  console.log("------------------------------")
  console.log(err);
  console.log("------------------------------")
});

module.exports = redis;
