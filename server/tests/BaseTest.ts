import 'reflect-metadata'
import {Server} from "../Server";
import {UnitOfWork} from "../db/UnitOfWork";
import {AppContainer} from "../ioc/Container";
import * as config from "config";
import * as express from 'express';

export class BaseTest {
  server: Server;
  app: any;
  uow: UnitOfWork;

  accessToken = "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";

  async before(clearDb?: boolean) {
    process.env.NODE_ENV = "test";
    this.server = new Server();
    this.app = express();
    await this.server.init(this.app);
    this.uow = AppContainer.container.get(UnitOfWork);

    if (!(clearDb === false))
      await this.clearDB();
  //  let redisCacheService = new CacheService(config.get("redis.locker"));
   // await redisCacheService.flush();
  }

  async clearDB() {
  }

  sleep(seconds) {
    return new Promise((res) => {
      setTimeout(() => {
        return res();
      }, seconds * 1000)
    })
  }

}
