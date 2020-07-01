/*
 * Validates if given fields are unique. Expects an array
 * strings in the form of "serviceName.field". For example,
 * ["users.email", "users.fullName"] will check if the "email"
 * and the "fullName" fields are unique on the "users" service.
 * Note: any service hook using this hook should have the
 * "searchRegex" in the before find hook.
 */

const isFieldsUnique = (svcFields: string[]) => async context => {
  if (context.type !== "before") {
    throw new Error("This hook can only be used as a before hook.");
  }

  if (context.method !== "create") {
    throw new Error("This hook can only be used before create.");
  }

  const user = context.params.user;
  const fieldsSplits = svcFields.map(v => v.split("."));

  const queryResults: Array<any> = await Promise.all(
    fieldsSplits.map(v => {
      if (context.data[v[1]] !== "") {
        return context.app.service(v[0]).find({
          user,
          query: {
            [v[1]]: {
              $search: `^${context.data[v[1]]}$`
            }
          }
        });
      }
      return { total: 0 };
    })
  );

  const isAllUnique = queryResults.every(v => v.total === 0);

  if (!isAllUnique) {
    throw new Error("The given field(s) is/are not unique.");
  }

  return context;
};

export default isFieldsUnique;
