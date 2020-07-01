import { log } from "@src/logger";
import validateString from "@plugins/validations/validate-string";
import {
  limitResourceToOrg,
  limitResourceToUserId,
  setUserIdForResource,
  setOrgIdForResource
} from "@plugins/restrictions/resource-restrictions";

const logErr = () => context => {
  console.log(
    "Error:",
    context.error.message,
    context.method,
    context.path,
    context.type,
    context.data
  );
  return context;
};

export default {
  before: {
    all: [log()],
    find: [limitResourceToOrg(), limitResourceToUserId()],
    get: [limitResourceToOrg(), limitResourceToUserId()],
    create: [validateString(), setUserIdForResource(), setOrgIdForResource()],
    update: [validateString(), limitResourceToOrg(), limitResourceToUserId()],
    patch: [validateString(), limitResourceToOrg(), limitResourceToUserId()],
    remove: [limitResourceToOrg(), limitResourceToUserId()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [logErr()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
