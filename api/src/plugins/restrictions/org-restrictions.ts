import { setField } from "feathers-authentication-hooks";

const associateToOrg = () => {
  return setField({
    from: "params.user.orgId",
    as: "data.orgId"
  });
};

const limitToOrg = () => {
  return setField({
    from: "params.user.orgId",
    as: "params.query.orgId"
  });
};

export { associateToOrg, limitToOrg };
