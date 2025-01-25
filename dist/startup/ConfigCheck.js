"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigCheck = void 0;
const config_1 = __importDefault(require("config"));
class ConfigCheck {
    run(context) {
        if (!config_1.default.has("port"))
            throw new Error("Kein 'port' konfiguriert.");
        // Database (MSSQL)
        if (!config_1.default.has("database"))
            throw new Error("Keine 'database' konfiguriert.");
        else {
            for (const prop of ["database", "username", "password", "host", "port"]) {
                if (!config_1.default.get("database").hasOwnProperty(prop) || !config_1.default.get("database")[prop]) {
                    throw new Error(`Keine 'database.${prop}' konfiguriert.`);
                }
            }
        }
    }
}
exports.ConfigCheck = ConfigCheck;
//# sourceMappingURL=ConfigCheck.js.map