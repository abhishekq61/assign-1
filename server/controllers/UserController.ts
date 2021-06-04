import {BaseController} from "./BaseController";
import {injectable} from "inversify";
import {User} from "../domain/User";

@injectable()
export class UserController extends BaseController {

  async addUser(req, res) {
    let body: User = req.body;
    let h = "";
  }
}
