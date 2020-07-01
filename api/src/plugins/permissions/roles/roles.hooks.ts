import * as authentication from "@feathersjs/authentication";
const { authenticate } = authentication.hooks;

const logValue = () => context => {
  console.log("--".repeat(20), context.data);
  return context;
};

export default {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [logValue()],
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
