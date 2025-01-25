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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoController = void 0;
const express = __importStar(require("express"));
const HttpErrorResponse_1 = require("../errorHandler/HttpErrorResponse");
const ToDo_1 = require("../services/ToDo");
const router = express.Router();
exports.ToDoController = router;
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req["decoded"];
        const data = req.body;
        data.createUser = user.mail;
        data.updateUser = user.mail;
        const result = yield ToDo_1.ToDoService._create(data);
        return res.status(200).json(result.dataValues);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
router.get('/read/:rowid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rowid = req.params.rowid;
        const result = yield ToDo_1.ToDoService._read(rowid);
        return res.status(200).json(result.dataValues);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
router.put('/update/:rowid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req["decoded"];
        const data = req.body;
        const rowid = req.params.rowid;
        data.updateUser = user.mail;
        const result = yield ToDo_1.ToDoService._update(data, rowid);
        return res.status(200).json(result.dataValues);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
router.post('/find', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.body;
        const result = yield ToDo_1.ToDoService._find(Object.assign({}, filter));
        return res.status(200).json(result);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
router.delete('/delete/:rowid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rowid = req.params.rowid;
        const result = yield ToDo_1.ToDoService._delete(rowid);
        return res.status(200).json(result.dataValues);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
//# sourceMappingURL=ToDo.js.map