import { ZodError, ZodIssue } from "zod"
import { TErrorSource, TGenericErrorResponse } from "../interfaces/error"

const zodError = (err:ZodError):TGenericErrorResponse => {
    const errorSource: TErrorSource = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path?.length - 1],
            message:issue.message
        } 
    })
    const statusCode = 400

    return {
        statusCode,
        message: "Validation failed",
        errorSource
    }
}

export default zodError