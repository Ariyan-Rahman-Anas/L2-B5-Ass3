import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import BookModel from "./Book.model"
import { bookServices } from "./book.services"

const createBook = catchAsync(async (req, res) => {
    const result = await bookServices.createBookInDB(req.body)

    sendResponse(res, {
        success: true,
        message: "Book created successfully",
        data: result
    })
})


// const getBooks = catchAsync(async (req, res) => {
//     const result = await bookServices.getBooksFromDB(req.query)

//     sendResponse(res, {
//         success: true,
//         message: "Books retrieved successfully",
//         data:result
//     })
// })
const getBooks = catchAsync(async (req, res) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = parseInt(req.query.skip as string) || 0;
    const page = parseInt(req.query.page as string) || 1;
    const filter = req.query.filter as string | undefined;

    const result = await bookServices.getBooksFromDB({
        ...req.query,
        limit,
        skip,
    });

    const total = await BookModel.countDocuments(
        filter ? { genre: filter } : {}
    );

    sendResponse(res, {
        success: true,
        message: "Books retrieved successfully",
        data: result,
        meta: {
            total,
            limit,
            skip,
            page,
            totalPage: Math.ceil(total / limit),
        }
    });
});



const getSingleBookById = catchAsync(async (req, res) => {
    const result = await bookServices.getSingleBookByIdFromDB(req.params.bookId)

    sendResponse(res, {
        success: true,
        message: "Book retrieved successfully",
        data: result
    })
})


const updateBook = catchAsync(async (req, res) => {
    const result = await bookServices.updateBookInDB(req.params.bookId, req.body)

    sendResponse(res, {
        success: true,
        message: "Book updated successfully",
        data: result
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