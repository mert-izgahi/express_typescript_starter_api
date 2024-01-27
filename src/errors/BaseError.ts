export class BaseError extends Error {
    statusCode: number;
    type: string;
    title: string;
    constructor(
        statusCode: number,
        title: string,
        message: string,
        type: string
    ) {
        super(message);
        this.statusCode = statusCode;
        this.title = title;
        this.type = type;
    }
}
