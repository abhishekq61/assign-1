import {BaseController} from "./BaseController";
import {injectable} from "inversify";
import {User} from "../domain/User";
import {UserRepository} from "../db/UserRepository";

@injectable()
export class UserController extends BaseController {

  async addUser(req, res) {
    let body: User = req.body;
    let role=req.state.user.role;

  }

  async login(req, res) {
    let body = req.body;
    let user = UserRepository.find({
      email: body.email
    }).lean()
    let h = user;
  }
}
