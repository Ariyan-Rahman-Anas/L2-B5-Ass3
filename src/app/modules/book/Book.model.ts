import { model, Schema } from "mongoose";
import { TBook } from "./book.interface";

const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, "Book title required"]
    },
    author: {
        type: String,
        required: [true, "Author's name required"]
    },
    genre: {
        type: String,
        required: [true, "Book's genre required"],
        enum: {
            values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
            message: "{VALUE} is not a valid"
        }
    },
    isbn: {
        type: String,
        required: [true, "ISBN number required"]
    },
    description: {
        type: String,
    },
    copies: {
        type: Number,
        required: [true, "Number of copies required"],
        min: 0,
    },
    available: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true, versionKey: false })

// instance method to handle availability
bookSchema.methods.updateAvailability = async function () {
    this.available = this.copies > 0;
    await this.save();
};

const BookModel = model<TBook>("book", bookSchema)
export default BookModel