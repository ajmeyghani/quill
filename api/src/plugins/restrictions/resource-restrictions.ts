import { setField } from "feathers-authentication-hooks";

const setUserIdForResource = () => async context => {
  const ignoreServices = ["authentication", "users", "allowed-orgs"];
  if (ignoreServices.some(v => context.path === v)) {
    return context;
  }

  if (!context.params.user) {
    throw new Error("Was trying to set userId, user was not given.");
  }

  const associateToUser = setField({
    from: "params.user._id",
    as: "data.userId"
  });

  return associateToUser(context);
};

const setOrgIdForResource = () => async context => {
  const ignoreServices = ["authentication", "users", "allowed-orgs"];
  if (ignoreServices.some(v => context.path === v)) {
    return context;
  }

  if (!context.params.user) {
    throw new Error("Was trying to set orgId, user was not given.");
  }

  const associateToOrg = setField({
    from: "params.user.orgId",
    as: "data.orgId"
  });

  return associateToOrg(context);
};

const limitResourceToOrg = () => async context => {
  const ignoreServices = ["authentication", "users", "allowed-orgs"];
  if (ignoreServices.some(v => context.path === v)) {
    return context;
  }

  if (!context.params.user) {
    throw new Error("Was trying to limit to orgId, user was not given.");
  }

  const limitToOrg = setField({
    from: "params.user.orgId",
    as: "params.query.orgId"
  });

  return limitToOrg(context);
};

const limitResourceToUserId = () => async context => {
  const ignoreServices = ["authentication", "users", "allowed-orgs"];
  if (ignoreServices.some(v => context.path === v)) {
    return context;
  }

  if (!context.params.user) {
    throw new Error("Was trying to limit to orgId, user was not given.");
  }

  const limitToUser = setField({
    from: "params.user._id",
    as: "params.query.userId"
  });

  return limitToUser(context);
};

export {
  setUserIdForResource,
  setOrgIdForResource,
  limitResourceToOrg,
  limitResourceToUserId
};
