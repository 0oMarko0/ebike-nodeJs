import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import User from "../model/user";
import formatError from "../utils/error";

const AUTHORIZATION = "Authorization";

export interface AuthRequest extends Request {
    user?: User;
}

const AuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header(AUTHORIZATION);
    if (token) {
        try {
            req.user = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET) as User;
        } catch (e) {
            logger.error(e.message);
            res.status(401).send(formatError("Authentication failed", req, 401));
        }
    } else {
        res.status(401).send(formatError("You need to be authenticated", req, 401));
    }
    next();
};

export default AuthMiddleware;
