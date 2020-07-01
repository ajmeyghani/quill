const Redis = require("ioredis");
const JSONCache = require("redis-json-forked");

export default function(app) {
  const redisConfig = app.get("redis");
  const redisConnection = new Redis({
    keyPrefix: "myapp:",
    port: redisConfig.port,
    host: redisConfig.host,
    family: 4,
    password: redisConfig.password,
    db: 0,
    reconnectOnError: function(err) {
      var targetError = "READONLY";
      if (err.message.slice(0, targetError.length) === targetError) {
        /* Only reconnect when the error starts with "READONLY" */
        return true;
      }
    }
  });

  const statusCallbacks = {
    connect() {
      console.log("Redis is connected.");
    },
    ready() {
      console.log("Redis is ready to receive commands.");
      const redisJson = new JSONCache(redisConnection, { prefix: "" });
      const redisClient = (type = "json") => {
        const clients = {
          json: redisJson,
          native: redisConnection
        };
        return clients[type];
      };

      app.set("redis_client", redisClient);
    },
    error(err) {
      console.log("Redis error: " + err);
    },
    close() {
      console.log("Redis connection is closed.");
    },
    reconnecting() {
      console.log("Redis attempting to reconnect...");
    },
    end() {
      console.log("Redis will not be making new connections.");
    }
  };

  for (const status of Object.keys(statusCallbacks)) {
    redisConnection.on(status, statusCallbacks[status]);
  }
}
