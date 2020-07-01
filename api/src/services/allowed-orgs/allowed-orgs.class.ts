import { Service, MongooseServiceOptions } from "feathers-mongoose";
import { Application } from "@src/declarations";

export class AllowedOrgs extends Service {
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }
}
