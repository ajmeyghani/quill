import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "@src/declarations";
import { Roles } from "./roles.class";
import createModel from "./roles.model";
import hooks from "./roles.hooks";

declare module "@src/declarations" {
  interface ServiceTypes {
    roles: Roles & ServiceAddons<any>;
  }
}

export default function(app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate")
  };

  app.use("/roles", new Roles(options, app));

  const service = app.service("roles");

  service.hooks(hooks);
}
