import { Application as ExpressFeathers } from "@feathersjs/express";

export interface ServiceTypes {
  app: any;
}
export type Application = ExpressFeathers<ServiceTypes>;
