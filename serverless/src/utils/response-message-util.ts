import {ResponseVO} from "../models/vo/responseVO";
import {headers} from "../constants/headers";

class Result {
    private readonly statusCode: number;
    private readonly message: string;
    private readonly data: any;
    private readonly headers: object = headers;

    constructor(statusCode: number, message: string, data?: any) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    response() {
        return {
            statusCode: this.statusCode,
            body: JSON.stringify({
                message: this.message,
                data: this.data,
            }),
            headers: this.headers,
        };
    }
}

export default class MessageUtil {
    static success(
        statusCode: number,
        message = "Success",
        data?: object
    ): ResponseVO {
        const result: Result = new Result(statusCode, message, data);

        return result.response();
    }

    static error(statusCode: number, message = "Error"): ResponseVO {
        const result: Result = new Result(statusCode, message);

        return result.response();
    }
}
