// Initializes the `copy-todos` service on path `/copy-todos`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "@src/declarations";
import { CopyTodos } from "./copy-todos.class";
import hooks from "./copy-todos.hooks";

// Add this service to the service type index
declare module "@src/declarations" {
  interface ServiceTypes {
    "copy-todos": CopyTodos & ServiceAddons<any>;
  }
}

export default function(app: Application) {
  const options = {
    paginate: app.get("paginate")
  };

  // Initialize our service with any options it requires
  app.use("/copy-todos", new CopyTodos(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("copy-todos");

  service.hooks(hooks);
}
