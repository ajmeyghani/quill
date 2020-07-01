import { Params as FeathersParams } from "@feathersjs/feathers";
import { Application } from "@src/declarations";

export default function(app: Application) {
  app.use((req: Partial<FeathersParams>, res, next) => {
    req.feathers.appName = "fullstack";
    next();
  });

  app.use("/health", (req: Partial<FeathersParams>, resp) => {
    console.log("health", req.feathers.paramsFromMiddle);
    return resp.json({
      status: "ok"
    });
  });

  console.log("-".repeat(40));
  console.log(app.get("redis"));
  console.log(app.get("mongodb"));
  console.log("-".repeat(40));
}
