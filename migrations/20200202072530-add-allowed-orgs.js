"use strict";
//https://db-migrate.readthedocs.io/en/latest/API/NoSQL/

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
  const orgs = [
    {
      name: "google",
      domain: "google.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0
    },
    {
      name: "apple",
      domain: "apple.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0
    }
  ];
  const mongo = await db._run("getDbInstance");
  await mongo.createCollection("allowedorgs");
  await mongo
    .collection("allowedorgs")
    .createIndex({ domain: 1 }, { unique: true });
  await mongo.collection("allowedorgs").insertMany(orgs);
  await mongo.close();
  return null;
};

exports.down = async function(db) {
  await db.dropCollection("allowedorgs");
  return null;
};

exports._meta = {
  version: 1
};
