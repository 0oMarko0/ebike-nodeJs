import { NextFunction, Request, Response } from "express";
import User from "../model/user";

export interface AuthRequest extends Request {
    user?: User;
}

const AuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    next();
};

export default AuthMiddleware;
