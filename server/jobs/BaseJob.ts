import 'reflect-metadata'
import * as config from "config"
import {logger} from "../util/Logger";

import {injectable} from "inversify";

@injectable()
export abstract class BaseJob {

  protected abstract jobName: string;

  isJobEnabled(): boolean {
    try {
      return config.get<boolean>('isJobEnabled');
    } catch (e) {
      return false
    }
  }

  public async abstract run(shopUrl?: string, data?: any);
}
