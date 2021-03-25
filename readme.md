# Quill (WIP)

> A framework based on FeathersJS and React for building real-time web applications

## Getting Started

- Make sure you have `nvm` installed.
- Run `nvm use` in the root of the project to switch to the correct version of Node.
- Run `yarn deps` to install all dependencies.
- Install Redis: `brew install redis`
- Start redis: `brew services start redis`
- Run `yarn dev` to get started. Alternatively, you can run each process in a separate terminal tab using `yarn u` in one tab and `yarn a` in the other.

## Dev Tasks

Below are some common tasks for development:

- Start the ui server: `yarn server -u -w` (Alias: `yarn u`)
- Start the api server: `yarn server -a -w` (Alias: `yarn a`)
- Run ui unit tests: `yarn test -u -w`
- Run api unit tests: `yarn test -a -w`
- Lint the ui code: `yarn lint -u -f`
- Lint the api code: `yarn lint -a -f`
- Format the ui code: `yarn format -u`
- Format the api code: `yarn format -a`
- Lint and Format the codebase: `yarn ff`

You can change these aliases in the `package.json` file located in the root of the project.

To see the list of available tasks, run `yarn task --help`. To see details about each available task, run `yarn task <task name> --help`. For example, `yarn task server --help` will print details on starting the server. All the tasks are documented in the files ending with `.task` in the `tasks` folder.

## Detailed Docs

For detailed docs please see the [docs](./docs/index.md).

## TODO

- [x] Add the `deps` task
- [x] Add the front-end CRA?
- [x] Add prettyier task
- [x] Add eslint task
- [x] Configure mocha for multiple folders with a config file
- [x] Add db migration configuration
- [x] Configure all unit tests, including unit tests for api TS code.
- [x] rename folders? server -> api, client -> ui ?
- [x] Use the front-end to create a user
- [x] Create a simple service
- [x] Configure channels
- [x] Hook up application level userID and orgID hooks
- [x] set up redis
- [x] set up github authentication
- [ ] esm vs ts ?
- [ ] add a function that calls the service and handles toaster call
- [ ] add notes about CRA config overrides.
- [ ] test ajmey/toaster.
- [ ] lazy loading components.
- [ ] add catch all error for react root.
- [ ] add plugin for managing orgID and userID...
- [ ] OrgDomain vs OrgID for limitting ... also in channel?
- [ ] Use internal folder for hooks and services, allow plugins?

- [ ] Add an example for search hook
- [ ] Add basic ACL, including hooks for userID assignment
- [ ] Hook up an example for Redis using a service

- [ ] Decide on ditribution: npm ? `@ajmey/quill` ?
- [ ] Add CI config?
- [ ] Deployment strategy?

- [ ] secure credentials for deployment
- [ ] E2E tests...?
- [ ] Document how to use the tasks and Feather's CLI
- [ ] Add more docs
- [ ] publish generator as a package? maybe https://saojs.org/?
