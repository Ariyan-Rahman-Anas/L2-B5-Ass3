export type TErrorSource = {
    path: string | number,
    message: string
}[]

export type TGenericErrorResponse = {
    statusCode: number,
    message: string,
    errorSource: TErrorSource
}

export interface ErrorProperties {
    message: string,
    type: string,
    [key:string]: any
}

export interface FieldError{
    message: string,
    name: string,
    properties: ErrorProperties
    kind: string
    path: string
    value:string
}

export interface ErrorResponse{
    message: string
    success: boolean
    error: {
        name: string,
        errors:Record<string, FieldError>
    }
}