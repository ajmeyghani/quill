import * as authentication from "@feathersjs/authentication";
import validateString from "@plugins/validations/validate-string";
import { limitToLoggedInUser } from "@plugins/restrictions/user-restrictions";
import searchRegex from "@plugins/common/search";
import isFieldsUnique from "@plugins/validations/is-unique";
import { getFromCacheIfExist, cacheAfterCreate } from "@plugins/cache/redis";
const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate("jwt")],
    find: [searchRegex()],
    get: [getFromCacheIfExist()],
    create: [
      isFieldsUnique(["todos.name"]),
      validateString(),
      limitToLoggedInUser()
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [cacheAfterCreate()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
