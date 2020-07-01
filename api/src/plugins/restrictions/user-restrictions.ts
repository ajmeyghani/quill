import { setField } from "feathers-authentication-hooks";
import is from "@sindresorhus/is";

const associateToUser = () => {
  return setField({
    from: "params.user._id",
    as: "data.userId"
  });
};

const limitToUser = () => {
  return setField({
    from: "params.user._id",
    as: "params.query.userId"
  });
};

const isSystemAdmin = () => context => {
  return context.params.user.permissions.includes("system_admin");
};

const limitToLoggedInUser = () => context => {
  if (is.undefined(context.params.provider)) {
    return context;
  }

  if (context.id) {
    if (String(context.id) !== String(context.params.user._id)) {
      throw new Error("Sorry, cannot query other users.");
    }
  }
  return context;
};

export { associateToUser, limitToUser, isSystemAdmin, limitToLoggedInUser };
