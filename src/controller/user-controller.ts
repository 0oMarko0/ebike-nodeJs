import bcrypt from "bcryptjs";
import UserRepo from "../data/repository/user-repo";
import User from "../model/user";
import { Token } from "./controller";
import jwt from "jsonwebtoken";
const uuidv1 = require("uuid/v1");

export default class UserController {
    private userRepo: UserRepo;
    constructor(userRepo: UserRepo) {
        this.userRepo = userRepo;
    }

    async signInUser(user: User): Promise<Token> {
        const retrievedUser: User = await this.userRepo.getByEmail(user.email);
        if (retrievedUser && bcrypt.compareSync(user.password, retrievedUser.password)) {
            retrievedUser.isActive = true;
            await this.userRepo.update(retrievedUser.id, retrievedUser);
            return this.createToken(user);
        } else {
            throw new Error("The password or the email are invalid");
        }
    }

    async createNewUser(user: User): Promise<Token> {
        if (await this.userRepo.getByEmail(user.email)) {
            throw new Error("Email already in use");
        }

        user.password = bcrypt.hashSync(user.password, 10);
        user.isAdmin = false;
        user.isActive = true;
        user.id = uuidv1();

        await this.userRepo.create(user);

        return this.createToken(user);
    }

    async logout(user: User) {
        const retrievedUser: User = await this.userRepo.getByEmail(user.email);
        retrievedUser.isActive = false;
        return await this.userRepo.update(retrievedUser.id, retrievedUser);
    }

    private createToken(user: User): Token {
        return {
            token: jwt.sign(
                {
                    email: user.email,
                    isAdmin: user.isAdmin,
                    id: user.id,
                },
                process.env.JWT_SECRET,
            ),
        };
    }
}
