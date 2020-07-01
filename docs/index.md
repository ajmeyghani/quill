# Docs

## Folder Structure

TODO

## Using the Feathers CLI

First, install Feathers CLI using `npm install -g @feathersjs/cli`. After it's installed you can check the installation using `feathers --help`. In order to use the CLI make sure that you are in the `api` folder. Once you are in the `api` folder, you can run any of Feathers commands. The most common command that you will be using is going to be `feathers generate service`. This command will generate a Feathers service. After you run the command, you will be prompted with some options. For example, you will be prompted to pick a name for your service, a database, and whether or not it should be authenticated. For more information, please check out the CLI [documentation](https://github.com/feathersjs/cli).


## Using Tasks

TODO

## Testing

TODO

## Database Migrations

You can run db migrations from the root of the project. Common commands include:

- `yarn db up`: will run all "up" migrations.
    - `yarn db up <migration filename>`: will run all "up" migrations upto, and including, the given migration.
    - `yarn db up -c 1`: will run one "up" migration, i.e. the next "up" migration
- `yarn db down`: will run one "down" migration.
    - `yarn db down <migration filename>`: will run all "down" migrations down to, and excluding, the given migration name.
    - `yarn db down -c 1`: will run the previous "down" migration.
    - `yarn db reset`: will run all "down" migrations.

## Dev Workflow

TODO

## Deployment

TODO
