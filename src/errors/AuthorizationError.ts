import { BaseError } from "./BaseError";

export class AuthorizationError extends BaseError {
    constructor(message: string) {
        super(401, message, "Unauthorized", "unauthorized");
    }
}
