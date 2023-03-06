import { IHttpException } from '../interfaces/http.exception.interface';

export class HttpException extends Error implements IHttpException {
    public readonly status: number;
    public readonly message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
