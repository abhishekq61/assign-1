import {BaseController} from "./BaseController";
import {injectable} from "inversify";
import {User} from "../domain/User";
import {UserRepository} from "../db/UserRepository";
import {UserRole} from "../domain/UserRole";
import {Task} from "../domain/Task";
import {TaskReviewerMapping} from "../domain/TeskReviewerMapping";
import {TaskReviewerMappingRepository} from "../db/TaskReviewerMappingRepository";

@injectable()
export class UserController extends BaseController {

  async addUser(req, res) {
    if (req.state.user.role !== UserRole.Admin) {
      return this.unAuthorised(req, res)
    }
    let body: User = req.body;
    let user = await UserRepository.getByEmail(body.email)
    if (user) {
      return res.status(400).send("User Already Exist");
    }
    body = Object.assign(new User(), body)
    await UserRepository.create(body)
    return res.status(201).send();
  }

  async listUser(req, res) {
    if (req.state.user.role !== UserRole.Admin) {
      return this.unAuthorised(req, res)
    }
    let skip = Number(req.query.skip);
    let take = Number(req.query.take);
    let users = await UserRepository.getUsers(skip, take)
    let data = {
      data: users.map(x => x.toJson())
    }
    return res.status(200).send(data)
  }

  async login(req, res) {
    let body = req.body;
    let user = UserRepository.find({
      email: body.email
    }).lean()
    let h = user;
  }

}
