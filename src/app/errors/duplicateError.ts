import { TErrorSource, TGenericErrorResponse } from "../interfaces/error"

const duplicateError= (err:any):TGenericErrorResponse=> {
    const matching = err.message.match(/"([^"]*)"/)

    const extractedMessage = matching && matching[1]
    
    const errorSource: TErrorSource = [
        {
            path: "",
            message:`${extractedMessage} is already exists`
        }
    ]

    const statusCode = 400
    return {
        statusCode,
        message: "Invalid Id",
        errorSource
    }
}
export default duplicateError