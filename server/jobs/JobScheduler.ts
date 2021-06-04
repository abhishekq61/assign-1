
import {logger} from "../util/Logger";
import {Messages} from "../util/Constants";


export class JobScheduler {

  private static _instance: JobScheduler;

  private isSchedulerInit: boolean = false;

  private constructor() {
  }

  static get instance(): JobScheduler {
    if (!this._instance) {
      this._instance = new JobScheduler();
    }

    return this._instance;
  }

  async init(): Promise<boolean> {

    if (this.isSchedulerInit) {
      logger.error(Messages.SchedulerAlreadyInit);
      return false;
    }

    //initiate a new job and init it


    return true;
  }
}
