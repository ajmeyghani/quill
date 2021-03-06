import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "@src/declarations";
import { Users } from "./users.class";
import createModel from "../../models/users.model";
import hooks from "./users.hooks";

declare module "@src/declarations" {
  interface ServiceTypes {
    users: Users & ServiceAddons<any>;
  }
}

export default function(app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate")
  };

  app.use("/users", new Users(options, app));

  const service = app.service("users");

  service.hooks(hooks);
}
