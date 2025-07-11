import AppError from "../../errors/AppError";
import BookModel from "../book/Book.model";
import { TBorrow } from "./borrow.interface";
import BorrowModel from "./Borrow.model";
import httpStatus from "http-status"


const borrowBookInDB = async (borrowData: TBorrow) => {
    // Fetch the book once
    const book = await BookModel.findById(borrowData?.book);
    if (!book) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid or non-existent Book ID");
    }

    // Check availability and quantity
    if (!book.available) {
        throw new AppError(httpStatus.BAD_REQUEST, "Book is currently unavailable");
    }

    if (borrowData.quantity > book.copies) {
        throw new AppError(httpStatus.BAD_REQUEST, "Insufficient copies available");
    }

    // Decrement copies
    book.copies -= borrowData.quantity;

    // Update availability based on new count
    await book.updateAvailability();

    // Create borrow record
    const result = await BorrowModel.create(borrowData);
    return result;
};


const getAllBorrowedBooksFromDB = async () => {
    const result = await BorrowModel.aggregate([
        {
            $group: {
                _id: "$book",
                totalQuantity: {$sum: "$quantity"}
            }
        },
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "_id",
               as:"bookDetails"
            }
        },
        {
            $unwind: "$bookDetails"
        },
        {
            $project: {
                "book.title": "$bookDetails.title",
                "book.isbn": "$bookDetails.isbn",
                totalQuantity:1
            }
        }
    ])
    return result
}

export const borrowServices = {
    borrowBookInDB,
    getAllBorrowedBooksFromDB
}