"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultOptions = { abortEarly: false, stripUnknown: true, allowUnknown: true };
const validator = (schema, options = {}, target) => {
    return (req, res, next) => {
        const data = getData(req, target);
        const result = schema.validate(data, Object.assign(Object.assign({}, DefaultOptions), options));
        if (result.error)
            return res.status(400).send(result.error.message);
        setData(req, result.value, target);
        next();
    };
};
const getData = (req, target) => {
    if (target)
        return req[target];
    return Object.assign(Object.assign(Object.assign({}, req.body), req.query), req.params);
};
const setData = (req, value, target) => {
    if (target)
        req[target] = value;
};
exports.default = validator;
//# sourceMappingURL=joiValidator.js.map