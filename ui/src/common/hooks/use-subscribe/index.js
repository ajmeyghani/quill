import is from "@sindresorhus/is";
import { useState, useEffect, useCallback } from "react";

/*
## `useSubscribe`

`useSubscribe` subscribes to a given feathers service and updates
the resource items when CRUD events (or custom defined events) are
fired. The returned value is an array where the first value is a
state variable with the result and the second value is set to error
or undefined if no errors occurs. This hook can be used to set up
a subscription in any "container" component that handles data to
child components. Once you set up the subscription, you won't have
worry about getting the latest on any events. See example below:

```
function Users(props) {
  const [users, usersError] = useSubscribe(client.service("users"));
  if (is.undefined(users)) {
    return <div>Loading</div>
  }

  if (usersError) {
    return <div> Error getting users </div>
  }

  return (
    <div>
      <h2>Users</h2>
      <p>Simple take advantage of the "users" state variable here. </p>
    </div>
  );
}
```

## Parameters:

1. **`featherService`**: a feathers serivce object, eg: client.service("users")
2. `query` (optional): feathers query object passed to find, eg: `{query { ... }}`
3. `extraEvents` (optional): extra feathers custom events to listen on, eg:
    ["SERVICE_ERROR"]
4. `watchList` (optional): an array of React state variables to watch to
    re-fetch items.

## Return value:

An array, where the first value is the result of the find call and the second
is set to any potential errors. If not error occurs, the value is `undefined`.

*/
const useSubscribe = (
  featherService,
  query = {},
  extraEvents = [],
  watchList = []
) => {
  if (is.undefined(featherService)) {
    throw new Error("Must provide a feathers service for the first argument.");
  }

  const serviceEvents = ["created", "updated", "patched", "removed"];
  const errorEvents = ["SERVICE_ERROR"]; /* must register custom event first */
  const allEvents = serviceEvents.concat(extraEvents).concat(errorEvents);

  const [items, setItems] = useState(void 0);
  const [error, setError] = useState(void 0);

  const _queryItems = eventData => () => {
    featherService
      .find(query)
      .then(r => setItems(r.data))
      .catch(err => {
        console.log(err);
        setItems([]);
        setError(err);
      });
  };

  const getItems = useCallback(_queryItems, []);

  useEffect(getItems(), []);

  useEffect(
    () => {
      if (watchList.length) {
        getItems()();
      }
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    watchList
  );

  useEffect(() => {
    for (const e of allEvents) {
      featherService.on(e, eventData => {
        getItems({ eventData, name: e })();
      });
    }
    return () => {
      for (const e of allEvents) {
        featherService.off(e);
      }
    };
  }, [featherService, getItems, allEvents]);

  return [items, error];
};

export default useSubscribe;
