export default class CustomError extends Error {
    code: number;
    reference?: string;
    data?: any;

    constructor(error: {
        message: string;
        code: number;
        reference?: string;
        data?: any;
    }) {
        super(error.message);
        this.code = error.code;
        this.reference = error.reference;
        this.data = error.data;
    }
}
