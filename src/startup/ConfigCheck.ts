import config from "config";
import { Runnable } from "./Runnable";

export class ConfigCheck implements Runnable {
    public run(context?: Object): void {
        if (!config.has("port")) throw new Error("Kein 'port' konfiguriert.");

        // Database (MSSQL)
        if (!config.has("database")) throw new Error("Keine 'database' konfiguriert.");
        else {
            for (const prop of ["database", "username", "password", "host", "port"]) {
                if (!config.get("database").hasOwnProperty(prop) || !config.get("database")[prop]) {
                    throw new Error(`Keine 'database.${prop}' konfiguriert.`);
                }
            }
        }
    }

}
