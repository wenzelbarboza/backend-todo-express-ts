"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalCatch = void 0;
const globalCatch = (err, req, res, next) => {
    res.send(err.message);
};
exports.globalCatch = globalCatch;
