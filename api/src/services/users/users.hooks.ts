import * as feathersAuthentication from "@feathersjs/authentication";
import * as local from "@feathersjs/authentication-local";
const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

import { disallow } from "feathers-hooks-common";
import {
  isInAllowedOrgs,
  setOrgId
} from "@plugins/validations/auth/org-validations";
import { credentialsStrength } from "@plugins/validations/auth/auth-rules";
import { limitToLoggedInUser } from "@plugins/restrictions/user-restrictions";

const setDefaultPermissions = () => context => {
  context.data.permissions = ["default"];
  return context;
};

export default {
  before: {
    all: [],
    find: [authenticate("jwt"), disallow("external")],
    get: [authenticate("jwt"), limitToLoggedInUser()],
    create: [
      ...credentialsStrength(),
      hashPassword("password"),
      isInAllowedOrgs(),
      setOrgId(),
      setDefaultPermissions()
    ],
    update: [
      hashPassword("password"),
      authenticate("jwt"),
      disallow("external"),
      disallow("server")
    ],
    patch: [
      hashPassword("password"),
      authenticate("jwt"),
      limitToLoggedInUser()
    ],
    remove: [authenticate("jwt"), disallow("external"), disallow("server")]
  },

  after: {
    all: [
      /*
       * Make sure the password field is never sent to the client
       * Always must be the last hook
       */
      protect("password")
    ],
    find: [],
    get: [],
    create: [],
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
