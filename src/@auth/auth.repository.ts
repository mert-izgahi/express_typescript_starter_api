import { Model } from "mongoose";
import { RegisterModel } from "./auth.types";
import { AuthDocument } from "./auth.model";
import { AuthenticationError } from "../errors";

class AuthRepository<T extends AuthDocument> {
    constructor(protected model: Model<T>) {}

    async register(
        data: RegisterModel
    ): Promise<{ user: T; token: string } | undefined> {
        try {
            const existingUser = await this.model.findOne({
                email: data.email,
            });

            if (existingUser) {
                throw new AuthenticationError("User already exists");
            }
            const user: T = await this.model.create(data);
            const token = await user.generateAuthToken();

            return {
                user,
                token,
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default AuthRepository;
