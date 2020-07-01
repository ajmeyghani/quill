/*
 This is a before hook that can be used on `find`
 to return results from Mongo matching a regular expression.
 First add it to a find hook:
   find: [searchRegex()]
 then on the client use the following query object:

```
query: {
  $limit: itemsPerPage,
  $skip: itemsPerPage * pageNumber,
  projects: {
    $in: ["proejct1"]
  },
  projectTagLabelsAndDescription: {
    $search: searchTerm
  }
}
```
*/

const searchRegex = () => context => {
  if (context.type !== "before") {
    throw new Error("Can use `searchRegex` only as a before hook");
  }
  const query = context.params.query;
  for (const field in query) {
    if (query[field].$search && field.indexOf("$") === -1) {
      query[field] = { $regex: new RegExp(query[field].$search, "i") };
    }
  }
  context.params.query = query;
  return context;
};

export default searchRegex;
