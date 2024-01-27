import { BaseError } from "./BaseError";

export class AuthenticationError extends BaseError {
    constructor(message: string) {
        super(401, message, "Unauthenticated", "unauthenticated");
    }
}
