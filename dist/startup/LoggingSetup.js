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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingSetup = void 0;
const winston = __importStar(require("winston"));
const logapp_1 = __importDefault(require("../middleware/logapp"));
class LoggingSetup {
    run(context) {
        winston.add(new winston.transports.File({
            filename: context.logPath + "/application.log",
            level: context.logLevel,
            format: winston.format.combine((0, logapp_1.default)({ name: context.app }), winston.format.timestamp(), winston.format.logstash())
        }));
        winston.add(new winston.transports.Console({
            silent: process.env["NODE_ENV"] === "production",
            level: context.logLevel,
            format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.align(), winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`))
        }));
        process.on("unhandledRejection", (ex) => {
            winston.error(ex);
            throw ex;
        });
        process.on("uncaughtException", (ex) => {
            winston.error(ex.message, ex);
            throw ex;
        });
    }
}
exports.LoggingSetup = LoggingSetup;
//# sourceMappingURL=LoggingSetup.js.map