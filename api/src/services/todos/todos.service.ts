import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "@src/declarations";
import { Todos } from "./todos.class";
import createModel from "../../models/todos.model";
import hooks from "./todos.hooks";

declare module "@src/declarations" {
  interface ServiceTypes {
    todos: Todos & ServiceAddons<any>;
  }
}

export default function(app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate")
  };

  app.use("/todos", new Todos(options, app));

  const service = app.service("todos");

  service.hooks(hooks);
}
