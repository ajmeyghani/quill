import { winston } from "./logger";
import app from "./app";

const port = app.get("port");
const server = app.listen(port);

process.on("unhandledRejection", (reason, p) =>
  winston.error("Unhandled Rejection at: Promise ", p, reason)
);

server.on("listening", () =>
  winston.info(
    "Feathers application started on http://%s:%d",
    app.get("host"),
    port
  )
);
