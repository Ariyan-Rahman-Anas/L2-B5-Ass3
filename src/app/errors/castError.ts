import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interfaces/error";

const castError = (
    err:mongoose.Error.CastError
): TGenericErrorResponse => {
    const errorSource: TErrorSource = [
        {
            path: err.path,
            message:err.message
        }
    ]
    const statusCode = 400
    return {
        statusCode,
        message: "Invalid Id",
        errorSource
    }
}
export default castError