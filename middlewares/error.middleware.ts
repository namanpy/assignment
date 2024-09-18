import { Request, Response, NextFunction } from "express";
import { ValidationError } from "joi";
import ERROR from "@constants/error.constant"
import CustomError from "@classes/error.class";

export const handleGeneralErrors = (error, req, res, next) => {
        // Joi validation error
        if (error instanceof ValidationError) {
            return res.status(400).json({
                ...ERROR.VALIDATION_ERROR,
                message: error.details[0].message,
            });
        }

        // Custom Error (should have code, reference and message, otherwise use unauthorized as defaults)
        if (error instanceof CustomError) {
            return res.status(error.code || ERROR.UNAUTHORIZED.code).json({
                code: error.code || ERROR.UNAUTHORIZED.code,
                reference: error.reference || ERROR.UNAUTHORIZED.reference,
                message: error.message || ERROR.UNAUTHORIZED.message,
                ...(error.data && { data: error.data }),
            });
        }

        // Uncaught Error
        console.log(`[UNCAUGHT ERROR] ${error.message}`);
        console.log(`[UNCAUGHT ERROR] ${error.stack}`);

        return res
            .status(ERROR.INTERNAL_SERVER_ERROR.code)
            .json(ERROR.INTERNAL_SERVER_ERROR);
};


export const handleRoutingError = (req, res, next) => {
    return res.status(ERROR.RESOURCE_NOT_FOUND.code).json(ERROR.RESOURCE_NOT_FOUND);
};
