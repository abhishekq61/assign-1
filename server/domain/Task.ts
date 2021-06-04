import * as mongoose from "mongoose"
import {models, ObjectId} from "mongoose";
import {IdGenerator} from "../util/IdGenerator";

let TaskSchema = new mongoose.Schema({
  uniqueId: String,
  title: String,
  description: String,
  userRef: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  approvedBy: [{
    type: String
  }],
  deletedAt: Date
});

class Task {
  uniqueId: string;
  title: string;
  description: string;
  approvedBy: string[];
  userRef:ObjectId;
  deletedAt: Date;

  constructor() {
    this.uniqueId = IdGenerator.getUniqueId()
  }

  toJson() {
    return this;
  }
}

type TaskDocument = Task & mongoose.Document
export {
  Task,
  TaskSchema,
  TaskDocument
}

