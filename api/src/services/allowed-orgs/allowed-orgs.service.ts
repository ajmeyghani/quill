import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "@src/declarations";
import { AllowedOrgs } from "./allowed-orgs.class";
import createModel from "../../models/allowed-orgs.model";
import hooks from "./allowed-orgs.hooks";

declare module "@src/declarations" {
  interface ServiceTypes {
    "allowed-orgs": AllowedOrgs & ServiceAddons<any>;
  }
}

export default function(app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate")
  };

  app.use("/allowed-orgs", new AllowedOrgs(options, app));

  const service = app.service("allowed-orgs");

  service.hooks(hooks);
}
