"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatError = (error, request, code) => {
    return {
        error: error,
        httpStatus: code || 500,
        method: request.method,
        url: request.url,
    };
};
exports.default = formatError;
//# sourceMappingURL=error.js.map