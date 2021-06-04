import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
import {Connection, createConnection, getConnection} from "typeorm";

import * as config from "config"
import {AppContainer} from "../ioc/Container";
import {injectable} from "inversify";
import {UnitOfWork} from "../db/UnitOfWork";
import {logger} from "../util/Logger";

@injectable()
export class PostgresStore {

  async createConnection(): Promise<UnitOfWork> {
    let connection = this.getConnectionIfExist();
    if (!connection) {
      const connectionProperties: PostgresConnectionOptions = {
        type: "postgres",
        entities: [config.get<string>("db.entities")],
        synchronize: config.get("db.synchronize"),
        host: config.get("db.host"),
        port: config.get("db.port"),
        username: config.get("db.user"),
        password: config.get("db.password"),
        database: config.get("db.db"),
        dropSchema: config.get("db.dropSchema")
      };

      let conn: Connection = await createConnection(connectionProperties);
      let uow = new UnitOfWork(conn);
      if (AppContainer.container)
        AppContainer.container.rebind<UnitOfWork>(UnitOfWork).toConstantValue(uow);
      return uow;
    }
    if (AppContainer.container)
      AppContainer.container.get(UnitOfWork);
    return null;
  }

  async statusCheck() {
    let connection = this.getConnectionIfExist();
    try {
      if (!connection)
        await this.createConnection();
      let isHealthy = await this.isConnected();
      if (!isHealthy) {
        if (connection.isConnected)
          await connection.close();
        logger.warn(`Retrying Db Connection`);
        await connection.connect();
        connection = this.getConnectionIfExist();
        if (!connection || !connection.isConnected)
          isHealthy = false;
        else
          isHealthy = true;
      }
      return isHealthy;
    } catch (e) {
      logger.error("Error during db Connection Health check", e);
      return false;
    }

  }

  private async isConnected() {
    try {
      // await AppContainer.container.get(UnitOfWork).appRepository.findOne();
      return true;
    } catch (e) {
      logger.error("Error checking connection Status", e);
      return false;
    }

  }

  private getConnectionIfExist() {
    try {
      return getConnection();
    } catch (e) {
      return null;
    }
  }
}
