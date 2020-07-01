import { Application } from "@src/declarations";

export default function(app: Application) {
  const modelName = "allowedOrgs";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      name: { type: String, required: true },
      domain: { type: String, required: true, unique: true }
    },
    {
      timestamps: true
    }
  );

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
}
