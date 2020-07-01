import { Application } from "@src/declarations";
import commonModel from "@src/common/common.model";

export default function(app: Application) {
  const modelName = "todos";
  const mongoose = app.get("mongooseClient");
  const ObjectId = mongoose.SchemaTypes.ObjectId;
  const cModel = commonModel(ObjectId);
  const schema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: false },
      isDone: { type: Boolean, required: true, default: false },
      ...cModel
    },
    {
      timestamps: true
    }
  );

  if (mongoose.modelNames().includes(modelName)) {
    mongoose.deleteModel(modelName);
  }
  return mongoose.model(modelName, schema);
}
