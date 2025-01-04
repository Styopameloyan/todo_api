import express from "express";
import config from "config";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import globalErrorHandler from "./middleware/errorhandler";
import errorHandlerStatic from "./middleware/errorHanlderStatic";
import * as path from "path";
import * as rfs from "rotating-file-stream";
import * as swagger from "swagger-jsdoc-express";
import * as swaggerDefinition from "./docs/swagger.json";
import * as winston from "winston";
import * as http from "http";
import { authentication } from "./middleware/auth";

export class Application {
    public app: express.Application;
    public port: number;

    constructor(controller: express.Router, port: number) {
        this.app = express();
        this.port = port;

        this.configureLogging();
        this.configureSwagger();
        this.initializeMiddlewares();
        this.initializeControllers(controller);
    }

    private configureLogging() {
        // create a rotating write stream
        const accessLogStream = rfs.createStream(
            path.posix.basename(config.get("log") + "/access.log"),
            {
                interval: "1d", // rotate daily
                path: path.dirname(config.get("log") + "/access.log")
            }
        );
        this.app.use(morgan("combined", { stream: accessLogStream }));
        this.app.use(morgan("tiny"));
    }

    private initializeMiddlewares() {

        this.app.use(cors({ origin: "*" }));

        this.app.use(express.static(path.join(__dirname, "../public")));
        this.app.use(express.static(path.resolve(config.get("attachmentFolder"))));
        this.app.use(errorHandlerStatic); // Static Middlwares müssen mit einen eigenen ErrorHandler initialisiert werden!

        this.app.use(express.json({ limit: '350mb' }));
        this.app.use(express.text());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(compression());
    }

    private async initializeControllers(controller: express.Router) {
        this.app.use(authentication);
        this.app.use("/api", controller);
        this.app.use(globalErrorHandler);
    }

    public configureSwagger() {
        swagger.setupSwaggerUIFromSourceFiles(
            swaggerDefinition as swagger.SetupSwaggerUIFromSourceFilesOptions,
            this.app
        );
    }

    public listen(): http.Server {
        return this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}