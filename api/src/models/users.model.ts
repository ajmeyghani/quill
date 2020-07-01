import { Application } from "@src/declarations";

export default function(app: Application) {
  const modelName = "users";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new mongooseClient.Schema(
    {
      name: { type: String, required: false },
      bio: { type: String, required: false },
      auth: { type: String, required: true },
      avatar: { type: String, required: false },
      email: { type: String, unique: true, lowercase: true },
      password: { type: String },
      // githubId: { type: String, unique: true },
      permissions: { type: Array, required: true },
      isOnboarded: { type: Boolean, default: false, required: true },
      github: { type: Object, default: {} },
      orgId: { type: String, required: true, unique: true },
      orgName: { type: String, required: false, unique: true }
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
