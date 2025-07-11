import { Response } from "express"

type TMeta = {
    limit: number
    page: number
    total: number
    totalPage:number
}

type TResponse<T> = {
    success: boolean
    message?: string
    meta?: TMeta
    data:T
}

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    res.status(data?.success ? 200 : 400).json({
        success: data?.success,
        message: data?.message,
        data:data?.data,
        meta: data?.meta
    })
}
export default sendResponse