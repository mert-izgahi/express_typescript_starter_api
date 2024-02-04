import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
    constructor(message: string) {
        super(404, "Not Found", message, "not_found");
    }
}
