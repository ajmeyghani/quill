const { shell } = require("./utils");
const apiShell = shell("./api");
const uiShell = shell("./ui");
const rootShell = shell("./");

module.exports = {
  apiShell,
  uiShell,
  rootShell
};
