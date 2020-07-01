import { Service, MongooseServiceOptions } from "feathers-mongoose";
import { Application } from "@src/declarations";

export class Roles extends Service {
  app: Application;
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }
}
