import config from "config";
import * as winston from "winston";
import { Router } from "express";
import { Application } from "./Application";
import { Startup } from "./startup/Startup";
import Controller from "./controllers";
import connectDatabase from "./connections/connectDatabase";

const main = async () => {
    const context: Object = { app: "intranet-api", logPath: config.get("log"), logLevel: config.get("logLevel") };
    new Startup(context).run();

    await connectDatabase();

    const routes: Router = await Controller();
    const app = new Application(routes, config.get("port"));
    app.listen();
}

main().catch((error) => winston.error(error.message || error.error || error));