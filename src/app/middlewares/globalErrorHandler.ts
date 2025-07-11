import { ErrorRequestHandler } from "express";
import { TErrorSource } from "../interfaces/error";
import zodError from "../errors/zodError";
import { ZodError } from "zod";
import validationError from "../errors/validationError";
import castError from "../errors/castError";
import AppError from "../errors/AppError";
import duplicateError from "../errors/duplicateError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorSource: TErrorSource = [
        {
            path: "",
            message: "Something went wrong!",
        },
    ];

    // Handle Zod validation error
    if (err instanceof ZodError) {
        const simplifiedErr = zodError(err);
        statusCode = simplifiedErr.statusCode;
        message = simplifiedErr.message;
        errorSource = simplifiedErr.errorSource;
    }

    // Handle Mongoose validation error
    else if (err?.name === "ValidationError") {
        const simplifiedErr = validationError(err);
        statusCode = simplifiedErr.statusCode;
        message = simplifiedErr.message;
        errorSource = simplifiedErr.errorSource;
    }

    // Handle Mongoose cast error
    else if (err?.name === "CastError") {
        const simplifiedErr = castError(err);
        statusCode = simplifiedErr.statusCode;
        message = simplifiedErr.message;
        errorSource = simplifiedErr.errorSource;
    }

    // Handle MongoDB duplicate key error
    else if (err?.code === 11000) {
        const simplifiedErr = duplicateError(err);
        statusCode = simplifiedErr.statusCode;
        message = simplifiedErr.message;
        errorSource = simplifiedErr.errorSource;
    }

    // Handle custom AppError
    else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
        errorSource = [
            {
                path: "",
                message: err.message,
            },
        ];
    }

    // Handle generic JS Error
    else if (err instanceof Error) {
        message = err.message;
        errorSource = [
            {
                path: "",
                message: err.message,
            },
        ];
    }

    // Safely extract details
    const pathName = errorSource[0]?.path || "";
    const valueOfPath = req.body?.[pathName];

    // Prepare error detail object
    const errorDetail: any = {
        message: errorSource[0]?.message,
        name: err?.name,
        path: pathName,
        value: valueOfPath,
    };

    // If ZodError, attach issue details
    if (err instanceof ZodError && err.issues?.[0]) {
        const issue = err.issues[0];

        errorDetail.properties = {
            message: issue.message,
        };

        // Add 'type' if it's a ZodInvalidTypeIssue
        if (issue.code === "invalid_type") {
            errorDetail.properties.type = issue.received;
        }

        // Add 'min' if it's a ZodTooSmallIssue (like for string.min or array.min)
        if (issue.code === "too_small") {
            errorDetail.properties.min = issue.minimum;
        }

        // Optional: include the code for debugging
        errorDetail.kind = issue.code;
    }

    res.status(statusCode).json({
        success: false,
        message,
        error: {
            name: err?.name,
            errors: {
                [pathName]: errorDetail,
            },
        },
    });
};
export default globalErrorHandler;