import {BaseRoutes} from "./BaseRoutes";
import {injectable} from "inversify";
import * as express from "express";
import {UserController} from "../controllers/UserController";
import {AppContainer} from "../ioc/Container";

@injectable()
export class UserRoutes extends BaseRoutes {
  private router = AppContainer.container.get(express.Router)

  constructor(public controller: UserController) {
    super(controller);
  }

  init() {
    this.router
      .post("/users", (req, res) => this.controller.addUser(req, res))
      .get("/users", (req, res) => this.controller.listUser(req, res))
      // .get("/users/login", (req, res) => this.controller.login(req, res))

  }
}
