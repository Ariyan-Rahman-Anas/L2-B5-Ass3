import { z } from "zod";

export const borrowValidateSchema = z.object({
    book: z
        .string()
        .refine(value => {
            return /^[0-9a-fAA-F]{24}$/.test(value)
        }, { message: "Invalid book Id" }),

    quantity: z
        .number()
        .int()
        .positive()
        .min(1,
            { message: "Quantity must be at least 1" }),

    dueDate: z
        .string()
        .datetime({ message: "Must be a valid ISO date format" })
        .transform(value => new Date(value))
        .refine(date => date > new Date(), "Due date should be a future date")
})