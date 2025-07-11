import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { borrowServices } from "./borrow.services";

const borrowBook = catchAsync(async (req, res) => {
    const result = await borrowServices.borrowBookInDB(req.body)

    sendResponse(res, {
        success: true,
        message: "Book borrowed successfully",
        data: result
    })
})


const borrowedBooks = catchAsync(async (req, res) => {
    const result = await borrowServices.getAllBorrowedBooksFromDB()

    sendResponse(res, {
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: result
    })

}) 

export const borrowControllers = {
    borrowBook,
    borrowedBooks
}