import {ConfigCheck} from "./ConfigCheck";
import {Runnable} from "./Runnable";
import {LoggingSetup} from "./LoggingSetup";

export class Startup {
    private context: Object = {};
    private runnables: Runnable[] = [];

    constructor(context?: Object) {
        if (context) this.context = context;
        this.initializeRunnables();
    }

    public run() {
        this.runnables.forEach((runnable) => {
            runnable.run(this.context);
        });
    }

    initializeRunnables(): void {
        this.runnables.push(new LoggingSetup());
        this.runnables.push(new ConfigCheck());
    }
}
