import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import User from "../model/user";

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
            res.status(401).send({ message: "Authentication failed" });
        }
    } else {
        res.status(401).send({ message: "You need to be Authenticated to access this ressource" });
    }
    next();
};

export default AuthMiddleware;
