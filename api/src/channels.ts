import "@feathersjs/transport-commons";
import { HookContext } from "@feathersjs/feathers";
import { Application } from "@src/declarations";

export default function(app: Application) {
  if (typeof app.channel !== "function") {
    return;
  }

  /* CHANNELS CONNECTIONS */
  const channelNames = {
    anonymous: "anonymous",
    authenticated: "authenticated",
    organization: "org"
  };

  app.on("connection", connection => {
    app.channel(channelNames.anonymous).join(connection);
    console.log("CONNECTION ANONYMOUS -----");
  });

  app.on("login", (authResult, { connection }) => {
    if (connection) {
      app.channel(channelNames.anonymous).leave(connection);
      if (connection.user.orgId) {
        app.channel(channelNames.authenticated).leave(connection);
      }
      console.log("AUTHENTICATED ---- ", connection.user.email);
      console.log(connection.user);
      app
        .channel(`${channelNames.organization}/${connection.user.orgId}`)
        .join(connection);
    }
  });

  app.on("disconnect", () => {
    console.log("DISCONNECTED .....");
  });

  /* PUBLISHERS */
  app.service("users").publish("created", () => {
    return app.channel(channelNames.authenticated);
  });

  app.publish((data, context) => {
    if (context.params && context.params.user) {
      console.log(
        "PUBLISHING DATA TO ORG",
        context.params.user.orgId,
        context.params.user.orgName
      );
      console.log(context.path);
      console.log(data);
      return app
        .channel(`${channelNames.organization}/${context.params.user.orgId}`)
        .send({
          data: data,
          path: context.path,
          method: context.method
        });
    } else {
      return app.channel(channelNames.anonymous);
    }
  });
}
