import {BaseController} from "../controllers/BaseController";;
import {injectable} from "inversify";
import {UserController} from "../controllers/UserController";
import * as express from "express";

@injectable()
export abstract class BaseRoutes {
  protected controller: BaseController;

  protected constructor( controller: BaseController) {
    this.controller = controller;
  }

  public abstract init();

}
