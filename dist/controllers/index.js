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
const express = __importStar(require("express"));
const initSchemas_1 = __importDefault(require("../schema/initSchemas"));
// Routes
const Base_1 = require("./Base");
const User_1 = require("./User");
const ToDo_1 = require("./ToDo");
const router = express.Router();
const defineRoutes = () => __awaiter(void 0, void 0, void 0, function* () {
    // Hier neue Routen definieren
    // ...
    router.use("/users", User_1.UserController);
    router.use("/todo", ToDo_1.ToDoController);
    // router.use("/file", DocumentController);
    // router.use("/dynamicdata", DynamicDataController);
    // router.use("/comment", CommentController);
    // Standard Routen 
    const { models } = yield (0, initSchemas_1.default)();
    const defaultRoutes = Object.keys(models);
    defaultRoutes.forEach((name) => router.use(`/${name.toLowerCase()}`, Base_1.BaseController));
    // Route not found
    router.all("*", (req, res) => {
        res.status(404).send(`Route: '${req.originalUrl}' not exist.`);
    });
    return router;
});
exports.default = defineRoutes;
//# sourceMappingURL=index.js.map