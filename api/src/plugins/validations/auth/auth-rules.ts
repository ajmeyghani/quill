import validator from "validator";
import pwdSchema from "./pwd-schema";

/*
 * Checks if the given email has valid format.
 */
const isValidEmail = () => context => {
  const isEmail = validator.isEmail(context.data.email);
  if (!isEmail) {
    throw new Error("Email received is not a valid email.");
  }
  return context;
};

/*
 * Checks if email unique at the app level.
 */
const isEmailTaken = () => async context => {
  const { email } = context.data;
  const result = await context.app.service("users").find({ query: { email } });
  const isEmail = result.total;
  if (isEmail) {
    throw new Error("This email address is taken, please try another one.");
  }
  return context;
};

/*
 *
 */
const isStrongPwd = () => context => {
  const pwd = context.data.password;
  const validation: any = pwdSchema.validate(pwd, { list: true });

  if (validation.length !== 0) {
    pwdSchema.validate(pwd, { list: true });
    throw new Error(validation.join(", "));
  }

  return context;
};

/*
 *
 */
const shouldCheckAuthStrength = () => {
  const env = process.env.NODE_ENV;
  const shouldCheck = env === "production" || env === "strict_login";
  return shouldCheck;
};

/*
 *
 */
const credentialsStrength = () => {
  if (shouldCheckAuthStrength()) {
    return [isValidEmail(), isStrongPwd(), isEmailTaken()];
  }

  return [isEmailTaken()];
};

export {
  isValidEmail,
  isStrongPwd,
  credentialsStrength,
  shouldCheckAuthStrength,
  isEmailTaken
};
