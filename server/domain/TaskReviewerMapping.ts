import * as mongoose from "mongoose"
import {models, ObjectId} from "mongoose";
import {IdGenerator} from "../util/IdGenerator";

let TaskReviewerMappingSchema = new mongoose.Schema({
  uniqueId: String,
  taskUniqueId: String,
  userUniqueId: String,
  isApproved:Boolean,
  deletedAt: Date
});

class TaskReviewerMapping {
  uniqueId: string;
  taskUniqueId: string;
  userUniqueId: string;
  isApproved: boolean;
  deletedAt: Date;

  constructor() {
    this.uniqueId = IdGenerator.getUniqueId()
  }

  toJson() {
    return this;
  }
}

type TaskReviewerMappingDocument = TaskReviewerMapping & mongoose.Document
export {
  TaskReviewerMapping,
  TaskReviewerMappingSchema,
  TaskReviewerMappingDocument
}

