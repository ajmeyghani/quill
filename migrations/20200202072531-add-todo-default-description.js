'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db) {
  const mongo = await db._run("getDbInstance");
  const isTodos = (await mongo
    .collection("todos")
    .find()
    .toArray()).length;

  if (!isTodos) {
    throw new Error("No todos have been created yet. Cannot run this migration.");
  }

  await mongo
    .collection("todos")
    .updateMany({}, { $set: { description: "My Todo Item" } }, {});
  await mongo.close();
  return null;
};

exports.down = async function(db) {
  const mongo = await db._run("getDbInstance");
  await mongo
    .collection("todos")
    .updateMany({}, { $unset: { description: "" } }, {});
  await mongo.close();
  return null;
};

exports._meta = {
  "version": 1
};
