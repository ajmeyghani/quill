const { sh } = require("tasksfile");
const defaultShellOutputOptions = { silent: false, nopipe: true };

/*
 * Wraps the `sh` function from `tasksfile` and sets the stdout
 * default options for verbose messages. It also gives you a function
 * where you can more expressively set the directory in from which
 * the shell commands will be executed.
 */
const shell = (cwd = "./") => (cmd, opts = defaultShellOutputOptions) => {
  return sh(cmd, { ...opts, cwd });
};

/**
 * Return a string that is colorized for printing to the console.
 * @param  {string} color color code, like blue, gree, redbg, etc
 * @return {function}       function to be called with a string to print
 */
const colors = color => {
  const cs = {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",

    blackbg: "\x1b[40m",
    redbg: "\x1b[41m",
    greenbg: "\x1b[42m",
    yellowbg: "\x1b[43m",
    bluebg: "\x1b[44m",
    magentabg: "\x1b[45m",
    cyanbg: "\x1b[46m",
    whitebg: "\x1b[47m"
  };

  return str => {
    return `${cs[color]}${str}\x1b[0m`;
  };
};

/**
 * Helper methods for logging with colors.
 */
const info = str => console.log(colors("cyan")(`⧗ ${str}`));
const ok = str => console.log(colors("cyan")(`✔ ${str}`));
const log = str => console.log(colors("cyan")(`${str}`));
const warn = str => console.log(colors("yellow")(`Warning: ${str}`));
const error = str => console.log(colors("red")(`× ${str}`));

const logger = {
  info,
  ok,
  log,
  warn,
  error
};

const is = {
  UNDEFINED: v => v === void 0,
  emptyObject: o => Object.keys(o).length === 0,
  boolean: v => typeof v === "boolean"
};

module.exports = {
  shell,
  logger,
  is
};
