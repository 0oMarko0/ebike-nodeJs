import { ObjectId } from "mongodb";

export interface Id {
    id: ObjectId;
}

export interface Token {
    token: string;
}

export default class Controller {
    toId(mongoId: ObjectId) {
        return {
            id: mongoId,
        };
    }
}
