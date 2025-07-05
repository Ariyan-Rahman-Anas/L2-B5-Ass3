import { ErrorRequestHandler } from "express";
import { TErrorSource } from "../interfaces/error";
import zodError from "../errors/zodError";
import { ZodError } from "zod";
import validationError from "../errors/validationError";
import castError from "../errors/castError";
import AppError from "../errors/AppError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500
    let message = "Something went wrong!"
    let errorSource: TErrorSource = [
        {
            path: "",
            message: "Something went wrong!"
        }
    ]
    if (err instanceof ZodError) {
        const simplifiedErr = zodError(err)
        statusCode = simplifiedErr?.statusCode
        message = simplifiedErr?.message
        errorSource = simplifiedErr?.errorSource
    }

    else if (err?.name === "ValidationError") {
        const simplifiedErr = validationError(err)
        statusCode = simplifiedErr?.statusCode
        message = simplifiedErr?.message
        errorSource = simplifiedErr?.errorSource
    }

    else if (err?.name === "CastError") {
        const simplifiedErr = castError(err)
        statusCode = simplifiedErr?.statusCode
        message = simplifiedErr?.message
        errorSource = simplifiedErr?.errorSource
    }

    else if (err?.code === "11000") {
        const simplifiedErr = castError(err)
        statusCode = simplifiedErr?.statusCode
        message = simplifiedErr?.message
        errorSource = simplifiedErr?.errorSource
    }

    else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err.message;
        errorSource = [
            {
                path: "",
                message: err?.message,
            },
        ];
    }

    else if (err instanceof Error) {
        message = err.message;
        errorSource = [
            {
                path: "",
                message: err?.message,
            },
        ];
    }

    let pathName = errorSource[0].path
    let valueOfPath = req.body[pathName]

    res.status(statusCode).json({
        message,
        success: false,
        error: {
            name: err?.name,
            errors: {
                [errorSource[0].path]: {
                    message: errorSource[0].message,
                    name: err?.name,
                    properties: {
                        message: err.issues[0]?.message,
                        type: err.issue[0]?.type,
                        min: err.issues[0]?.minimum
                    },
                    kind: err.issues[0]?.code,
                    path: errorSource[0]?.path,
                    value: valueOfPath
                }
            }
        }
    })
}
export default globalErrorHandler