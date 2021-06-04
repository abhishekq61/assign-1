import * as mongoose from "mongoose"
import {models} from "mongoose";
import {IdGenerator} from "../util/IdGenerator";

let UserSchema = new mongoose.Schema({
  uniqueId: String,
  role: Number
});

class User {
  uniqueId: string;

  constructor() {
    this.uniqueId = IdGenerator.getUniqueId()
  }
}

type UserDocument = User & mongoose.Document
export {
  User,
  UserSchema,
  UserDocument
}

