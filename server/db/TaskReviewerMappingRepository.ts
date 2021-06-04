import * as mongoose from "mongoose";
import {Task, TaskDocument, TaskSchema} from "../domain/Task";
import {ObjectId} from "mongoose";
import {User} from "../domain/User";
import {
  TaskReviewerMapping,
  TaskReviewerMappingDocument,
  TaskReviewerMappingSchema
} from "../domain/TaskReviewerMapping";

let TaskReviewerMappingModel = mongoose.model<TaskReviewerMappingDocument>('taskReviewerMappings', TaskReviewerMappingSchema);

export class TaskReviewerMappingRepository extends TaskReviewerMappingModel {
  static async getMapping(userUniqueId: string, taskUniqueId: string) {
    let mapping = await this.findOne({
      taskUniqueId: taskUniqueId,
      userUniqueId: userUniqueId,
    }).lean();
    if (mapping) {
      return Object.assign(new TaskReviewerMapping(), mapping);
    }
  }

  static async getReviewAssignedUsers(taskUniqueId: string) {
    let mappings = await this.find({
      taskUniqueId: taskUniqueId
    }).lean();
    if (mappings) {
      return mappings.map(mapping=>{
        return Object.assign(new TaskReviewerMappingRepository(), mapping);
      })
    }
  }

  static async getAssignedTasks(userUniqueId: string, skip, limit) {
    let tasks = await this.find({
      deletedAt: null,
      userUniqueId: userUniqueId
    }).limit(limit)
      .skip(skip)
      .lean();
    if (tasks) {
      return tasks.map(x => Object.assign(new TaskReviewerMapping(), x))
    }
  }
}
