import {BaseRoutes} from "./BaseRoutes";
import * as express from 'express';
import {injectable} from "inversify";
import {AppContainer} from "../ioc/Container";
import {UserRoutes} from "./UserRoutes";
import {RequestValidator} from "../middleware/RequestValidator";
import {UserRepository} from "../db/UserRepository";
const jwt = require('jsonwebtoken');

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
    let requestValidator = new RequestValidator();
    const cookieParser = require('cookie-parser')
    app.use(cookieParser())
    app.use(express.json())

    this.routes.forEach(r => r.init());
    app.use("/login", async (req, res) => {
      let body = req.body;
      let user = await UserRepository.findOne({
        email: body.email
      }).lean()
      if (!user) {
        res.status(401).send();
        return;
      }
      const token = jwt.sign({ uniqueId: user.uniqueId}, 'shhhhh');
      res.cookie("jwt", token, {secure: true, httpOnly: true})
      res.status(200).send()
      return;
    });
    app.use((req, res, next) => requestValidator.validateRequest(req, res, next));
    app.use(this.router);

  }
}
