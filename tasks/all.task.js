const { shell, logger, is } = require("./utils");
const { apiShell, uiShell, rootShell } = require("./config");
const { help } = require("tasksfile");
const dedent = require("dedent");

function server(givenOptions) {
  const defaultOptions = { api: true, watch: true };
  const options = { ...givenOptions };
  const startExample =
    "For example, try: `yarn task server --api` to start the api server.";

  if (is.emptyObject(options)) {
    options.api = defaultOptions.api;
    options.watch = defaultOptions.watch;
  }

  const invalidOptionsCombinations = [
    ["a", "u"],
    ["api", "ui"],
    ["a", "ui"],
    ["api", "u"]
  ];

  const isAnyInvalidOption = invalidOptionsCombinations.some(ic =>
    ic.every(o => Object.keys(options).includes(o))
  );

  if (isAnyInvalidOption) {
    return logger.warn(
      `Can only specify either --api or --ui, but not both. ${startExample}`
    );
  }

  if (options.api || options.a) {
    logger.info("Starting the api server...");
    if (options.watch || options.w) {
      apiShell(
        "npx shx rm -rf lib/ && npx ts-node-dev --compiler ttypescript --no-notify src/"
      );
    } else {
      apiShell("npx shx rm -rf lib/ && npx ttsc && node lib/");
    }
  } else if (options.ui || options.u) {
    logger.info("Starting the ui server...");
    uiShell("BROWSER=none npx rescripts start");
  } else {
    return logger.warn(`Missing --api or --ui option. ${startExample}`);
  }
}

help(server, "Starts the ui or the api server.", {
  params: [],
  options: {
    api: "Will only start the api server.",
    a: "Same as --api",
    ui: "Will only start the ui server.",
    u: "Same as --ui",
    watch: "Will start a given server in dev/watch mode.",
    w: "Same as watch"
  },
  examples: dedent`
    yarn task server # by default, it will start api server in dev mode.
    yarn task server --api # starts the api server.
    yarn task server --api --watch # starts the api server in dev mode.
    yarn task server --ui # starts the ui server.
  `
});

function deps() {
  const install = "yarn install";
  logger.info("Installing api dependencies.");
  apiShell(install);
  logger.info("Installing ui dependencies.");
  uiShell(install);
}

help(
  deps,
  "Installs all dependencies, both for the client and the api, using Yarn."
);

function format(options) {
  logger.info("Formatting code ...");
  rootShell('npx prettier  --write "tasks/**/*.js"');

  const server = () => {
    logger.info("Running Prettier for the server code ...");
    apiShell('npx prettier  --write "{src,test}/**/*.ts"');
  };

  const client = () => {
    logger.info("Running Prettier for the client code ...");
    uiShell('npx prettier  --write "src/**/*.js"');
  };

  if (!Object.keys(options).length) {
    server();
    client();
  } else {
    if (options.api || options.a) {
      server();
    }
    if (options.ui || options.u) {
      client();
    }
  }
}

help(format, "Runs Prettier for the ui and the api code.", {
  params: [],
  options: {
    api: "Formats the server-side code.",
    a: "Alias for --api",
    ui: "Formats the client-side code.",
    u: "Alias for --ui"
  },
  examples: dedent`
    yarn task format --ui
    yarn task format --api
    yarn task format --ui --api # formats both the front-end and server-side code.
    yarn task format # by default formats the codebase.
  `
});

function lint(options) {
  const serverLintCmd = "npx eslint src/**/*.ts --config .eslintrc.js";
  const clientLintCmd = "npx eslint src/. --config .eslintrc.json";

  const server = isFix => {
    logger.info("Linting server-side code ...");
    apiShell(`${serverLintCmd} ${isFix ? "--fix" : ""}`);
  };

  const client = isFix => {
    logger.info("Linting client-side code ...");
    /* You don't want these to be automatically fixed ...
     * you have to examine the changes before changing them.
     */
    const rulesToSkip = ["react-hooks/exhaustive-deps"];
    const skips = rulesToSkip.map(r => `--rule '${r}:off'`).join(" ");
    uiShell(`${clientLintCmd} ${isFix ? `--fix ${skips}` : ""}`);
  };

  const defaultCondition =
    is.emptyObject(options) ||
    (Object.keys(options).length === 1 &&
      (is.boolean(options.f) || is.boolean(options.fix)));

  if (defaultCondition) {
    server(true);
    client(true);
  } else {
    if (options.api || options.a) {
      if (options.fix || options.f) {
        server(true);
      } else {
        server();
      }
    }
    if (options.ui || options.u) {
      if (options.fix || options.f) {
        client(true);
      } else {
        client();
      }
    }
  }
}

help(lint, "Lints the codebase using Eslint.", {
  params: [],
  options: {
    api: "If specified, the server-side code is linted.",
    a: "Alias for --api",
    ui: "If specified, the client-side code is linted.",
    u: "Alias for --ui",
    fix: "If specified, Eslint will try to automatically fix the issues.",
    f: "Alias for fix."
  },
  examples: dedent`
    yarn task lint: lins all code, and fixes issues
    yarn task lint --ui: Lint the client code
    yarn task lint --api: Lint the server code
    yarn task lint -u -f: Lint the client code and auto-fix issues
    yarn task lint -u -a -f: Lints the client and server and auto-fixes. Ssame as "yarn task lint"
  `
});

function test(options) {
  logger.info("Running units tests ...");
  const serverTestCmd = `npx ts-mocha --config .mocharc.js --paths --recursive --exit`;
  const clientTestCmd = "npx rescripts test";

  const server = isWatch => {
    logger.info("Running server unit tests...");
    apiShell(`${serverTestCmd} ${isWatch ? "--watch" : ""}`);
  };

  const client = isWatch => {
    logger.info("Running client unit tests...");
    uiShell(`${isWatch ? "" : "CI=true"} ${clientTestCmd}`);
  };

  if (is.emptyObject(options)) {
    server();
    client();
  } else {
    if (options.api || options.a) {
      if (options.watch || options.w) {
        return server(true);
      } else {
        server();
      }
    }
    if (options.ui || options.u) {
      if (options.watch || options.w) {
        return client(true);
      } else {
        client();
      }
    }
  }
}

help(test, "Runs units tests for the codebase.", {
  params: [],
  options: {
    api: "If specified, the server-side units tests are executed.",
    a: "Alias for --api",
    ui: "If specified, the client-side units tests are executed",
    u: "Alias for --ui",
    watch: "If specified, runner will watch files for changes.",
    w: "Alias for watch"
  },
  examples: dedent`
    yarn task test: runs unit tests for the codebase. Same as "yarn task test -c -s"
  `
});

function build(options) {
  logger.info("Building ...");
  const serverBuildCmd = 'echo "Nothing to build"';
  const clientBuildCmd = "npx rescripts build";

  const server = isWatch => {
    logger.info("Building the server ...");
    apiShell(serverBuildCmd);
  };

  const client = isWatch => {
    logger.info("Building the client ...");
    uiShell(clientBuildCmd);
  };

  if (is.emptyObject(options)) {
    client();
  } else {
    if (options.api || options.a) {
      server();
    }
    if (options.ui || options.u) {
      client();
    }
  }
}

help(build, "Builds the source code.", {
  params: [],
  options: {
    api: "If specified, only the server-side code is built.",
    a: "Alias for --api",
    ui: "If specified, only the client-side code is built.",
    u: "Alias for --ui"
  },
  examples: dedent`
    yarn task build: builds the client code by default
    yarn task build -u: builds the ui.
  `
});

module.exports = {
  server,
  deps,
  format,
  lint,
  test,
  build
};
