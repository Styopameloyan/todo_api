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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSchema = exports.CreateSchema = void 0;
const Joi = __importStar(require("joi"));
/* const MAX_FILES = 10;



const ACCEPTED_FILE_TYPES = [
  "image/*",
  "audio/*",
  "video/*",
  "application/pdf",
  "application/msword",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/x-vcard",
  "text/csv",
  "application/json",
  "application/xml",
  "application/x-xliff+xml",
  "text/plain",
  "application/zip",
  "application/x-zip-compressed",
  "multipart/x-zip",
  "text/html",
  "text/css",
  "application/javascript",
  "application/rss+xml",
  "application/xhtml+xml",
  "application/rdf+xml",
  "application/mathml+xml",
  "application/font-woff",
  "application/font-woff2",
  "application/vnd.oasis.opendocument.text",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.oasis.opendocument.presentation",
  "application/vnd.oasis.opendocument.graphics",
  "application/x-yaml",
  "text/yaml"
]; */
const CreateSchema = Joi.object({
    public: Joi.string().valid('1', '0').default("0"),
    className: Joi.string(),
    reference: Joi.string(),
    department: Joi.string()
});
exports.CreateSchema = CreateSchema;
const DeleteSchema = Joi.object({
    rowid: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string()).max(10).message("Es dürfen maximal 10 Dateien gelöscht werden!"))
});
exports.DeleteSchema = DeleteSchema;
//# sourceMappingURL=file.js.map