"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findServiceName = void 0;
const initSchemas_1 = require("../schema/initSchemas");
const findServiceName = (req, res, next) => {
    const url = req.baseUrl;
    const index = url.lastIndexOf("/");
    const serviceName = url.substring(index + 1, url.length).toUpperCase();
    const service = initSchemas_1.models[serviceName];
    if (!service)
        return res.status(404).send(`Route: '${req.originalUrl}' not exist.`);
    req["SERVICE"] = service;
    return next();
};
exports.findServiceName = findServiceName;
//# sourceMappingURL=findServiceName.js.map