import "reflect-metadata";
import {Server} from "./Server";
import {logger} from "./util/Logger";

const express = require('express');
const app = express();


(async () => {
  const server = await (new Server().init(app));
  const port = process.env.PORT || 3000;
  server.listen(port);
  logger.info(`App Started at port:${port}`);
})();
