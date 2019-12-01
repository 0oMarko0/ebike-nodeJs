import User from "../../model/user";
import logger from "../../utils/logger";
import _ from "lodash";
const neo4j = require("neo4j-driver").v1;

const uri = process.env.NEO4J_URL;
const user = process.env.NEO4J_USER;
const password = process.env.NEO4J_PASSWORD;

export default class UserRepo {
    session: any;
    constructor() {
        const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
        this.session = driver.session();
        logger.info(`NEO4J connected on ${uri}`);
    }

    async getActiveUser() {
        let result;

        result = await this.session.run(`MATCH (a: User) WHERE a.isActive=true RETURN a`);

        if (_.isEmpty(result.records)) return null;

        return result.records.length;
    }

    async getTotalUser() {
        let result;

        result = await this.session.run(`MATCH (a: User) RETURN a`);

        if (_.isEmpty(result.records)) return null;

        return result.records.length;
    }

    async update(userId: string, user: User) {
        let result;
        try {
            result = await this.session.run(
                `MATCH (a: User {id: $id}) SET a.email=$email, a.isActive=$isActive, a.id=$id, a.isAdmin=$isAdmin RETURN a`,
                {
                    email: user.email,
                    isActive: user.isActive,
                    id: user.id,
                    isAdmin: user.isAdmin,
                },
            );
        } catch (e) {
            logger.error(`Error while updating the user: ${e}`);
        }

        if (_.isEmpty(result.records)) return null;

        const record = result.records[0];

        const userFound: User = {
            email: record.get(0).properties.email,
            isActive: record.get(0).properties.isActive,
            id: record.get(0).properties.id,
            isAdmin: record.get(0).properties.isAdmin,
        };

        return userFound;
    }

    async create(user: User) {
        let response;
        try {
            response = await this.session.run(
                `CREATE (a: User {email: $email, isActive: $isActive, password: $password, id: $id, isAdmin: $isAdmin}) RETURN a`,
                {
                    email: user.email,
                    isActive: user.isActive,
                    password: user.password,
                    id: user.id,
                    isAdmin: user.isAdmin,
                },
            );
        } catch (e) {
            logger.error("Error while creating user");
        }
    }

    async getByEmail(email: string): Promise<User> {
        let result;
        try {
            result = await this.session.run("MATCH (user:User {email:{email}}) RETURN user", { email: email });
        } catch (e) {
            logger.error(`Error while getting user by email: ${e}`);
        }

        if (_.isEmpty(result.records)) return null;

        const record = result.records[0];

        const user: User = {
            email: record.get(0).properties.email,
            isActive: record.get(0).properties.isActive,
            id: record.get(0).properties.id,
            isAdmin: record.get(0).properties.isAdmin,
            password: record.get(0).properties.password,
        };

        return user;
    }
}
