import { Application } from "@src/declarations";
import users from "./users/users.service";
import todos from "./todos/todos.service";
import allowedOrgs from "./allowed-orgs/allowed-orgs.service";
import copyTodos from "./copy-todos/copy-todos.service";

export default function(app: Application) {
  app.configure(users);
  app.configure(todos);
  app.configure(allowedOrgs);
  app.configure(copyTodos);
}
