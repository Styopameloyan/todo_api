"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const errorhandler_1 = __importDefault(require("./middleware/errorhandler"));
const errorHanlderStatic_1 = __importDefault(require("./middleware/errorHanlderStatic"));
const path = __importStar(require("path"));
const rfs = __importStar(require("rotating-file-stream"));
const swagger = __importStar(require("swagger-jsdoc-express"));
const swaggerDefinition = __importStar(require("./docs/swagger.json"));
const auth_1 = require("./middleware/auth");
class Application {
    constructor(controller, port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.configureLogging();
        this.configureSwagger();
        this.initializeMiddlewares();
        this.initializeControllers(controller);
    }
    configureLogging() {
        // create a rotating write stream
        const accessLogStream = rfs.createStream(path.posix.basename(config_1.default.get("log") + "/access.log"), {
            interval: "1d",
            path: path.dirname(config_1.default.get("log") + "/access.log")
        });
        this.app.use((0, morgan_1.default)("combined", { stream: accessLogStream }));
        this.app.use((0, morgan_1.default)("tiny"));
    }
    initializeMiddlewares() {
        this.app.use((0, cors_1.default)({ origin: "*" }));
        this.app.use(express_1.default.static(path.join(__dirname, "../public")));
        this.app.use(express_1.default.static(path.resolve(config_1.default.get("attachmentFolder"))));
        this.app.use(errorHanlderStatic_1.default); // Static Middlwares müssen mit einen eigenen ErrorHandler initialisiert werden!
        this.app.use(express_1.default.json({ limit: '350mb' }));
        this.app.use(express_1.default.text());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, compression_1.default)());
    }
    initializeControllers(controller) {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(auth_1.authentication);
            this.app.use("/api", controller);
            this.app.use(errorhandler_1.default);
        });
    }
    configureSwagger() {
        swagger.setupSwaggerUIFromSourceFiles(swaggerDefinition, this.app);
    }
    listen() {
        return this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
exports.Application = Application;
//# sourceMappingURL=Application.js.map