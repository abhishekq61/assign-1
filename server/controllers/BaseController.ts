import {injectable} from "inversify";
import * as Router from "koa-router";
import {StatusCode} from "../util/Constants";
import * as config from "config";

@injectable()
export abstract class BaseController {
  baseApiUrl = config.get("baseApiUrl");
  baseUIUrl = config.get("baseUIUrl");


  error(ctx: Router.IRouterContext, errorCode: number, message: string = "") {
    ctx.status = errorCode;
    ctx.body = {
      status: errorCode,
      message: message
    };
  }

  created(ctx: Router.IRouterContext, data = null) {
    ctx.status = StatusCode.Created;

    if (data) {
      ctx.body = data;
    }
  }

  unAuthorised(req, res) {
    res.status(401).send()
  }
}
