import * as mongoose from "mongoose";
import {User, UserDocument, UserSchema} from "../domain/User";

let UserModel = mongoose.model<UserDocument>('users', UserSchema);

export class UserRepository extends UserModel {
  static async getByEmail(email: string) {
    let user = await this.findOne({
      email: email
    }).lean();
    if (user) {
      return Object.assign(new User(), user);
    }
  }
  static async getUsers(skip,limit) {
   let users= await this.find({
     deletedAt:null
    }).limit(limit)
      .skip(skip)
     .lean();
    if (users) {
      return users.map(x=>Object.assign(new User(), x))
    }
  }
}
