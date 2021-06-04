import {BaseController} from "./BaseController";
import {injectable} from "inversify";
import {User} from "../domain/User";
import {UserRepository} from "../db/UserRepository";
import {UserRole} from "../domain/UserRole";
import {Task} from "../domain/Task";
import {TaskReviewerMapping} from "../domain/TeskReviewerMapping";
import {TaskReviewerMappingRepository} from "../db/TaskReviewerMappingRepository";
import {Encryptor} from "../util/Encryptor";

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
    if(!body.email || !body.password){
      return res.status(400).send("Bad Request");
    }
    body = Object.assign(new User(), body)
    body.password=Encryptor.encrypt(body.password)
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


}
