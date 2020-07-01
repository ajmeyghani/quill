"use strict";

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

  const isPets = (await mongo
    .collection("pets")
    .find()
    .toArray()).length;

  if (!isPets) {
    console.log("nothing to update");
  } else {
    console.log("yes we are going to update");
    const results = await mongo
      .collection("pets")
      .find()
      .toArray();

    await Promise.all(
      results.map(async (p, i) => {
        return mongo
          .collection("pets")
          .update({ _id: p._id }, { $set: { pid: i } });
      })
    );
  }

  await mongo.close();
  return null;
};

exports.down = async function(db) {
  const mongo = await db._run("getDbInstance");
  await mongo
    .collection("pets")
    .updateMany({}, { $unset: { pid: "" } }, {});
  await mongo.close();
  return null;
};

exports._meta = {
  version: 1
};

/* using run interface */
// var command = "updateMany";
// var renameFieldOptions = {
//   query: {},
//   update: {
//     $set: {
//       ownerId: "25"
//     }
//   },
//   options: {}
// };

// await db._run(
//   command,
//   "pets",
//   renameFieldOptions);


/* for loop */
// const mongo = await db._run("getDbInstance");

// const isPets = (await mongo
//   .collection("pets")
//   .find()
//   .toArray()).length;

// if (!isPets) {
//   console.log("nothing to update");
// } else {
//   console.log("yes we are going to update");
//   const results = await mongo
//     .collection("pets")
//     .find()
//     .toArray();

//   await Promise.all(
//     results.map(async (p, i) => {
//       return mongo
//         .collection("pets")
//         .update({ _id: p._id }, { $set: { pid: i } });
//     })
//   );
// }

// await mongo.close();
// return null;
