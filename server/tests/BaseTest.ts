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


  async before(clearDb?: boolean) {
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
