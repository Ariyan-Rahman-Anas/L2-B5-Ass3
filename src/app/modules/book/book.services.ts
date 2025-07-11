import { TBook } from "./book.interface";
import BookModel from "./Book.model";

const createBookInDB = async (bookData: TBook) => {
    const result = await BookModel.create(bookData)
    return result
}

const getBooksFromDB = async (query: any) => {
    if (query?.filter) {
        const book = await BookModel.aggregate([
            {
                $match: {
                    genre: query.filter
                }
            },
            {
                $sort: {
                    [query.sortBy]:query.sort === "asc" ? 1 : -1
                }
            },
            {
                $limit: parseInt(query.limit) || 10
            }
        ])
        return book
    } else {
        const book = await BookModel.find()
            .sort({ [query.sortBy]: query.sort === "asc" ? 1 : -1 })
            .limit(parseInt(query.limit) || 10)
        return book
    }
}

const getSingleBookByIdFromDB = async (bookId: string) => {
    const result = await BookModel.findById(bookId)
    return result
}

const updateBookInDB = async (bookId: string, bookData:Partial<TBook>) => {
    const result = await BookModel.findByIdAndUpdate(bookId, bookData)
    return result
}

const deleteBookFromDB = async (bookId: string) => {
    const result = await BookModel.findByIdAndDelete(bookId)
    return result
}

export const bookServices = {
    createBookInDB,
    getBooksFromDB,
    getSingleBookByIdFromDB,
    updateBookInDB,
    deleteBookFromDB
}