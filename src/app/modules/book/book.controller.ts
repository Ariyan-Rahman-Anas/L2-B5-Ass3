import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { bookServices } from "./book.services"

const createBook = catchAsync(async (req, res) => {
    const bookData = req.body
    const result = await bookServices.createBookInDB(bookData)

    sendResponse(res, {
        success: true,
        message: "Book Created!",
        data:result
    })
})


const getBooks = catchAsync(async (req, res) => {
    const result = await bookServices.getBooksFromDB(req.query)

    sendResponse(res, {
        success: true,
        message: "Books Retrieved!",
        data:result
    })
})

export const bookControllers = {
    createBook,
    getBooks
}