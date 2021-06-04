import {BaseController} from "./BaseController";
import {injectable} from "inversify";
import {Task} from "../domain/Task";
import {TaskRepository} from "../db/TaskRepository";
import {ObjectId} from "mongoose";
import * as mongoose from "mongoose";
import {UserRepository} from "../db/UserRepository";
import {UserRole} from "../domain/UserRole";
import {TaskReviewerMapping} from "../domain/TeskReviewerMapping";
import {TaskReviewerMappingRepository} from "../db/TaskReviewerMappingRepository";

@injectable()
export class TaskController extends BaseController {

  async addTask(req, res) {
    // task will always be added to same user
    let body: Task = req.body;
    body.userRef = mongoose.mongo.ObjectId((req.state.user._id.toString()));
    body = Object.assign(new Task(), body)
    await TaskRepository.create(body)
    return res.status(201).send();
  }

  async getTasks(req, res) {
    let skip = Number(req.query.skip);
    let take = Number(req.query.take);
    let userId = req.query.userId
    //if logged in user is not equal to user whose tasks are requested
    if (userId && userId !== req.state.user._id.toString()) {
      if (req.state.user.role !== UserRole.Admin) {
        return this.unAuthorised(req, res)
      }
    }
    if (!userId) {
      userId = req.state.user._id
    }
    let tasks = await TaskRepository.getTasks(userId, skip, take)
    let data = {
      data: tasks.map(x => x.toJson())
    }
    return res.status(200).send(data)
  }

  async getTask(req, res) {
    let id = req.params.id;
    //either the task is of user itself ,
    // or is it a super user
    //or user is a reviewer for the given task
    let task: Task = await TaskRepository.getTask(id)
    if (!task) {
      return req.status(400).send("Task Does not Exist")
    }
    // user is super user
    if (req.state.user.role === UserRole.Admin) {
      return res.status(200).send(task)
    }
    //task is of logged in user
    if (task.userRef.toString() === req.state.user._id.toString()) {
      return res.status(200).send(task)
    }

    //check is user is a reviewer for given task
    let mapping=await TaskReviewerMappingRepository.getMapping(req.state.user.uniqueId,task.uniqueId)

    if(mapping){
      return res.status(200).send(task)
    }
    return this.unAuthorised(req, res)
  }


  async addReviewer(req, res) {
    let taskId = req.params.id;
    if (req.state.user.role !== UserRole.Admin) {
      return this.unAuthorised(req, res)
    }
    let body: TaskReviewerMapping = req.body;
    let mapping: TaskReviewerMapping = await TaskReviewerMappingRepository
      .getMapping(body.userUniqueId, taskId)
    if (mapping) {
      return res.status(400).send("Reviewer Already Added");
    }
    mapping = new TaskReviewerMapping()
    mapping.taskUniqueId = taskId;
    mapping.userUniqueId = body.userUniqueId;
    await TaskReviewerMappingRepository.create(mapping)
    return res.status(201).send();
  }

  async deleteReviewer(req, res) {
    let taskId = req.params.id;
    if (req.state.user.role !== UserRole.Admin) {
      return this.unAuthorised(req, res)
    }
    let body: TaskReviewerMapping = req.body;
    let mapping: TaskReviewerMapping = await TaskReviewerMappingRepository
      .getMapping(body.userUniqueId, taskId)
    if (!mapping) {
      return res.status(400).send("Given Reviewer mapping does not exist");
    }
    await TaskReviewerMappingRepository.deleteOne({
      uniqueId: mapping.uniqueId
    })
    return res.status(200).send();
  }

  async getReviewAssignedTasks(req, res) {
    let skip = Number(req.query.skip);
    let take = Number(req.query.take);
    let taskMappings = await TaskReviewerMappingRepository
      .getAssignedTasks(req.state.user.uniqueId, skip, take)
    let tasks = await TaskRepository.getByUniqueIds(taskMappings.map(x => x.taskUniqueId))
    let data = {
      data: tasks.map(x => x.toJson())
    }
    return res.status(200).send(data)
  }


  async updateReview(req, res) {
    let taskId = req.params.id;
    let body: TaskReviewerMapping = req.body;
    let mapping: TaskReviewerMapping = await TaskReviewerMappingRepository
      .getMapping(req.state.user.uniqueId, taskId)
    if (!mapping) {
      return res.status(400).send("Given Reviewer mapping does not exist");
    }

    await TaskReviewerMappingRepository.findOneAndUpdate({
      uniqueId: mapping.uniqueId
    }, {
      isApproved: body.isApproved
    })
    return res.status(200).send();
  }

}
