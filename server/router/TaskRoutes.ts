import {BaseRoutes} from "./BaseRoutes";
import {injectable} from "inversify";
import {AppContainer} from "../ioc/Container";
import * as express from "express";
import {UserController} from "../controllers/UserController";
import {TaskController} from "../controllers/TaskController";

@injectable()
export class TaskRoutes extends BaseRoutes {
  private router = AppContainer.container.get(express.Router)

  constructor(public controller: TaskController) {
    super(controller);
  }

  init() {
    this.router
      .post("/tasks", (req, res) => this.controller.addTask(req, res))
      .get("/tasks", (req, res) => this.controller.getTasks(req, res))
      .get("/tasks/assignedForReview", (req, res) => this.controller.getReviewAssignedTasks(req, res))
      .get("/tasks/:id", (req, res) => this.controller.getTask(req, res))
      .post("/tasks/:id/reviewers", (req, res) => this.controller.addReviewer(req, res))
      .delete("/tasks/:id/reviewers", (req, res) => this.controller.deleteReviewer(req, res))
      .put("/tasks/:id/reviewers", (req, res) => this.controller.updateReview(req, res))


  }
}
