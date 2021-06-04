import * as mongoose from "mongoose"
import {models} from "mongoose";
import {IdGenerator} from "../util/IdGenerator";

let UserSchema = new mongoose.Schema({
  uniqueId: String,
  role: Number,
  name: String,
  email: String,
  password: String
});

class User {
  uniqueId: string;
  name: string;
  email: string;
  password: string;

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

