import * as mongoose from "mongoose";
import {UserDocument, UserSchema} from "../domain/User";

let UserModel = mongoose.model<UserDocument>('users', UserSchema);

export class UserRepository extends UserModel {

}
