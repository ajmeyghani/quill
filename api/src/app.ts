import path from "path";
import favicon from "serve-favicon";
import compress from "compression";
import helmet from "helmet";
import cors from "cors";
import feathers from "@feathersjs/feathers";
import configuration from "@feathersjs/configuration";
import express from "@feathersjs/express";
import socketio from "@feathersjs/socketio";
import { Application } from "@src/declarations";
import { winston as logger } from "@src/logger";
import middleware from "@src/middleware";
import services from "@src/services";
import appHooks from "@src/app.hooks";
import channels from "@src/channels";
import authentication from "@src/authentication";
import mongoose from "@src/mongoose";
import redis from "@src/redis";
import permissions from "@src/plugins/permissions";

const app: Application = express(feathers());

/* Load app configuration */
app.configure(configuration());
app.configure(express.rest());

/* Enable security, CORS, compression, favicon and body parsing */
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get("public"), "favicon.ico")));

console.log(app.get("authentication"));

/* Host the public folder */
app.use("/", express.static(app.get("public")));

/* Set up Plugins and providers */
app.configure(socketio());

/* db */
app.configure(mongoose);

/* cahce */
app.configure(redis);

/* Configure other middleware (see `middleware/index.js`) */
app.configure(middleware);
app.configure(authentication);

/* Services and Channels */
app.configure(services);
app.configure(channels);

/* Plugin Services */
app.configure(permissions());

/* Configure a middleware for 404s and the error handler */
app.use(express.notFound());
app.use(express.errorHandler({ logger } as any));

/* Configure app hooks */
app.hooks(appHooks);

export default app;
