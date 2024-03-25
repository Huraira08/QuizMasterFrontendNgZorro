import { User } from "./user";

export interface LoginResult {
    token: string,
    expiration: Date;
    user:User;
}
