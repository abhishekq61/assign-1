import * as mongoose from "mongoose";
import {Task, TaskDocument, TaskSchema} from "../domain/Task";
import {ObjectId} from "mongoose";
import {User} from "../domain/User";
import {TaskReviewerMappingRepository} from "./TaskReviewerMappingRepository";

let TaskModel = mongoose.model<TaskDocument>('tasks', TaskSchema);

export class TaskRepository extends TaskModel {
  static async getTasks(userId: ObjectId, skip, limit) {
    let tasks = await this.find({
      deletedAt: null,
      userRef: userId
    }).limit(limit)
      .skip(skip)
      .lean();
    if (tasks) {
      return tasks.map(x => Object.assign(new Task(), x))
    }
  }

  static async getTask(uniqueId: string) {
    let task = await this.findOne({
      deletedAt: null,
      uniqueId: uniqueId
    })
      .lean();
    if (task) {
      let reviewUsers = await TaskReviewerMappingRepository.getReviewAssignedUsers(task.uniqueId)
      task.reviewers = reviewUsers.map(x => x.uniqueId)
      task.approvedBy = reviewUsers.filter(x=>x.isApproved).map(x => x.uniqueId)
      return Object.assign(new Task(), task);
    }
  }

  static async getByUniqueIds(uniqueIds: string[]) {
    let tasks = await this.find({
      uniqueId: {"$in": uniqueIds}
    }).lean()
    if (tasks) {
      return tasks.map(x => Object.assign(new Task(), x))
    }
  }
}
