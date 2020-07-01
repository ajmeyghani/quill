import { Application } from "@src/declarations";
import commonModel from "@src/common/common.model";

export default function(app: Application) {
  const modelName = "roles";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const ObjectId = Schema.Types.ObjectId;
  const cModel = commonModel(ObjectId);
  const schema = new Schema(
    {
      name: { type: String, required: true },
      ...cModel
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
