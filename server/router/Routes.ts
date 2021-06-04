import {BaseRoutes} from "./BaseRoutes";
import * as express from 'express';
import {injectable} from "inversify";
import {AppContainer} from "../ioc/Container";
import {UserRoutes} from "./UserRoutes";

@injectable()
export class Routes {
  routes: BaseRoutes[] = [];
  router: express.Router;

  constructor(
    router: express.Router
  ) {
    this.router = router;
    this.routes.push(AppContainer.container.get(UserRoutes))
  }

  init(app: express.Application) {
    // app.use(bodyParser({
    //   jsonLimit: "60mb"
    // }));
    const bodyParser = require('body-parser');
    app.use(express.json())

    this.routes.forEach(r => r.init());

   // app.use(this.router.allowedMethods());
    app.use(this.router);
    // app.use(async (ctx) => {
    //   console.log(ctx.request.url);
    //   ctx.status = 200;
    //   ctx.body = "Ok!Ready"
    // });
  }
}
