import validator from "validator";
/*
 *
 */
const isInvalidInputString = str => {
  if (str === "") {
    return false;
  }
  const MAX_INPUT_LENGTH = 1000;
  return !validator.isAscii(str) || str.length > MAX_INPUT_LENGTH;
};

/*
 * Before hook only. Check the fields coming through
 * if any of them is string, run string validation.
 * We are going to use this system wide to prevent
 * bad string input.
 */
const validateString = () => async context => {
  if (context.path === "authentication") {
    return context;
  }

  if (context.type !== "before") {
    throw new Error("This hook can only be used as a before hook.");
  }

  const invalidMethods = ["remove", "find", "get"];
  if (invalidMethods.some(v => v === context.method)) {
    throw new Error("This hook can only be used for create, update, and patch");
  }

  const keysForStringValues = Object.keys(context.data).filter(
    k => typeof context.data[k] === "string"
  );

  if (keysForStringValues.length === 0) {
    return context;
  }

  if (
    keysForStringValues.map(v => context.data[v]).some(isInvalidInputString)
  ) {
    throw new Error("One of the values didnt meet the string validation.");
  }

  return context;
};

export default validateString;
