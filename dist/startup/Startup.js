"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Startup = void 0;
const ConfigCheck_1 = require("./ConfigCheck");
const LoggingSetup_1 = require("./LoggingSetup");
class Startup {
    constructor(context) {
        this.context = {};
        this.runnables = [];
        if (context)
            this.context = context;
        this.initializeRunnables();
    }
    run() {
        this.runnables.forEach((runnable) => {
            runnable.run(this.context);
        });
    }
    initializeRunnables() {
        this.runnables.push(new LoggingSetup_1.LoggingSetup());
        this.runnables.push(new ConfigCheck_1.ConfigCheck());
    }
}
exports.Startup = Startup;
//# sourceMappingURL=Startup.js.map