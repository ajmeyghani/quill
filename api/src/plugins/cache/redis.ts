import is from "@sindresorhus/is";
import rfdc from "rfdc";

const valuesToString = (storedObject, mongoose) => {
  const clone = rfdc();
  const converted = clone(storedObject);
  delete converted.__v;
  for (const field of Object.keys(storedObject)) {
    if (mongoose.isValidObjectId(storedObject[field])) {
      converted[field] = String(storedObject[field]);
    }

    if (is.date(storedObject[field])) {
      converted[field] = storedObject[field].toISOString();
    }
  }
  return converted;
};

const getFromCacheIfExist = () => async context => {
  if (context.type !== "before") {
    throw new Error("This hook can be used only as a before:get hook.");
  }

  if (context.method !== "get") {
    throw new Error("This hook can only be used for `get`");
  }

  const redis = context.app.get("redis_client")();
  const r = await redis.get(`${context.path}:${context.id}`);
  if (r) {
    /* will not call db in before hook. */
    context.result = { ...r, isCached: true };
  }
  return context;
};

const cacheAfterCreate = () => async context => {
  const redis = context.app.get("redis_client")();
  const mongoose = context.app.get("mongooseClient");
  try {
    await redis.set(
      `${context.path}:${String(context.result._id)}`,
      valuesToString(context.result, mongoose)
    );
  } catch (err) {
    throw new err(err);
  }
  return context;
};

export { getFromCacheIfExist, cacheAfterCreate };
