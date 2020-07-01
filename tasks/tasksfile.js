const { cli, help } = require("tasksfile");
const all = require("./all.task");

cli({
  ...all
});
