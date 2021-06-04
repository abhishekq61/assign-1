import "reflect-metadata";
import {Routes} from "./router/Routes";
import {AppContainer} from "./ioc/Container";
import {JobScheduler} from "./jobs/JobScheduler";
import * as express from 'express';
import {Application} from "express/index";
//import {Container} from "./ioc/Container";


export class Server {

  async init(app:express.Application): Promise<any> {
    // app.proxy = true;
    //
    // app.on('error', (err, ctx) => {
    //   let error = `error at request ${ctx.request.method} ${ctx.request.href},Stack:${err.stack}`;
    //   logger.error(error);
    // });

    await AppContainer.instance.init();

    //if (!AppContainer.container.isBound(express.Application))
      AppContainer.container.bind(express.application).toConstantValue(app);

    const routes = new Routes(AppContainer.container.get(express.Router));
    routes.init(app);

    if (process.env.NODE_ENV !== "test")
      await JobScheduler.instance.init();

    return app;
  }

  async destroy() {
    //todo: all server flush up activity
  }
}
