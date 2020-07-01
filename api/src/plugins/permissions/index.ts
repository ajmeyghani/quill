import rolesSvc from "./roles/roles.service";

function permissions(config?: object) {
  return function(app) {
    app.configure(rolesSvc);
    console.log("cofiguring permissions...");
  };
}

export default permissions;
