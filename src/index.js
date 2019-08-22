const winston = require("winston");
const express = require("express");
const config = require("config");
const app = express();

require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/db")();
require("./startup/logger")();

// const port = process.env.port || config.get("port");

// console.dir(config.get("port"));
const port = process.env.port || config.get("port");
const server = app.listen(port, () => {
  winston.info(`Listening on port ${port}`);
});

module.express = server;
