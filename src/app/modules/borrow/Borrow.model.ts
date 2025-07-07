import { Schema } from "mongoose";
import { TBorrow } from "./borrow.interface";
import { model } from "mongoose";

const borrowSchema: Schema<TBorrow> = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: "book",
        required:[true, "Book Id is required"]
    },
    quantity: {
        type: Number,
        required: [true, "Borrow quantity is required"],
        min:1
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"],
        validate: {
            validator: (value: Date) => value > new Date(),
            message:"Due date should be a future date"
        }
    }

}, {timestamps:true, versionKey:false} )

const BorrowModel = model<TBorrow>("borrow", borrowSchema)
export default BorrowModel