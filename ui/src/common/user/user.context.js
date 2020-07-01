import { createContext } from "react";

const UserContext = createContext({
  id: "",
  name: "",
  organization: "",
  permissions: "",
  orgId: ""
});

export default UserContext;
