"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
/*
 * function application (info)
 * Returns a new instance of the application Format which adds the
 * application name to the info.
 *
 * { name: application name }  // f. e. "blockdata-notification"
 */
const application = (0, winston_1.format)((info, opts = {}) => {
    if (opts.name)
        info.app = opts.name;
    return info;
});
exports.default = application;
//# sourceMappingURL=logapp.js.map