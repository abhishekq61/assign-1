export class Messages {

  static EntityNotFound = "The Entity for given Id was not found";
  static BadRequest = "Bad request";
  static SchedulerAlreadyInit = "Job Scheduler is already init, ignoring init";
  static ApiUnauthorised = "Not Allowed to access this resource";
  static InternalServerError = "Internal Server Error";

}

export class StatusCode {
  static Ok = 200;
  static BadRequest = 400;
  static InternalServerError = 500;
  static NotFound = 404;
  static Created = 201;
  static Unauthorised = 401;
  static Conflict = 409;
}

export class AppConstants {

}

export class EmailTemplates {
  static Welcome = 'welcome';
}
