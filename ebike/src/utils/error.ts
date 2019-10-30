import { Request } from "express";

const formatError = (error: any, request: Request, code?: number) => {
    return {
        error: error,
        httpStatus: code || 500,
        method: request.method,
        url: request.url,
    };
};

export default formatError;
