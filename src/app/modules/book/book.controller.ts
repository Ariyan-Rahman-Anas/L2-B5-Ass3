import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { bookServices } from "./book.services"

const createBook = catchAsync(async (req, res) => {
    const result = await bookServices.createBookInDB(req.body)

    sendResponse(res, {
        success: true,
        message: "Book created successfully",
        data:result
    })
})


const getBooks = catchAsync(async (req, res) => {
    const result = await bookServices.getBooksFromDB(req.query)

    sendResponse(res, {
        success: true,
        message: "Books retrieved successfully",
        data:result
    })
})


const getSingleBookById = catchAsync(async (req, res) => {
    const result = await bookServices.getSingleBookByIdFromDB(req.params.bookId)

    sendResponse(res, {
        success: true,
        message: "Book retrieved successfully",
        data:result
    })
})


const updateBook = catchAsync(async (req, res) => {
    const result = await bookServices.updateBookInDB(req.params.bookId, req.body)

    sendResponse(res, {
        success: true,
        message: "Book updated successfully",
        data:result
    })
})


const deleteBook = catchAsync(async (req, res) => {
    await bookServices.deleteBookFromDB(req.params.bookId)

    sendResponse(res, {
        success: true,
        message: "Book deleted successfully",
        data: null
    })
})


export const bookControllers = {
    createBook,
    getBooks,
    getSingleBookById,
    updateBook,
    deleteBook
}