export class HttpError extends Error {
    public status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends HttpError {
    constructor(message: string = "Bad Request") {
        super(400, message);
    }
}

export class NotFoundError extends HttpError {
    constructor(message: string = "Resource not found") {
        super(404, message);
    }
}

export class ConflictError extends HttpError {
    constructor(message: string = "Resource already exists") {
        super(409, message);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message: string = "Unauthorized") {
        super(401, message);
    }
}

export class ForbiddenError extends HttpError {
    constructor(message: string = "Forbidden") {
        super(403, message);
    }
}

export class InternalServerError extends HttpError {
    constructor(message: string = "Internal Server Error") {
        super(500, message);
    }
}
