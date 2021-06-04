import {Container, decorate, injectable} from "inversify";
import {Routes} from "../router/Routes";
import * as express from 'express';

import * as mongoose from "mongoose";
import * as config from "config";
import {UnitOfWork} from "../db/UnitOfWork";
import {UserController} from "../controllers/UserController";
import {UserRoutes} from "../router/UserRoutes";
import {TaskController} from "../controllers/TaskController";
import {TaskRoutes} from "../router/TaskRoutes";

export class AppContainer {

  private constructor() {
  }

  private static _container: Container;

  private static _instance: AppContainer;

  static get instance() {
    if (!AppContainer._instance) {
      AppContainer._instance = new AppContainer();
    }

    return AppContainer._instance;
  }

  static get container(): Container {
    return AppContainer._container;
  }

  async init() {
    if (!AppContainer._container) {

      const container = new Container();
      container.bind<UnitOfWork>(UnitOfWork).toConstantValue(new UnitOfWork());

      await mongoose.connect(config.get("db.mongoUrl"));
      const router = express.Router()
      //  router.prefix("/api");

      // routes
      container.bind<express.Router>(express.Router).toConstantValue(router);
      container.bind<Routes>(Routes).to(Routes);
      container.bind<UserRoutes>(UserRoutes).to(UserRoutes);
      container.bind<TaskRoutes>(TaskRoutes).to(TaskRoutes);

      // repositories


      // controller
      container.bind<UserController>(UserController).to(UserController)
      container.bind<TaskController>(TaskController).to(TaskController)

      // services


      // jobs


      AppContainer._container = container;
    }
  }
}
