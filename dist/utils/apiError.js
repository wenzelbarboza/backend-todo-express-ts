"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiError = void 0;
class apiError extends Error {
    constructor(message, code) {
        super(message);
        this.message = message;
        this.code = code;
    }
}
exports.apiError = apiError;
