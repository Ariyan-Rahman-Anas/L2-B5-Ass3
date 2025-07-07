import { z } from "zod";

const BookGenreEnum = z.enum([
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
])

export const bookValidateSchema = z.object({
    title: z
        .string()
        .min(3, "Title can not be empty")
        .trim(),

    author: z
        .string()
        .min(3, "Author name can not be empty")
        .trim(),

    genre: BookGenreEnum,

    isbn: z
        .string()
        .min(3, "ISBN can not be empty"),

    description: z
        .string()
        .trim()
        .optional(),

    copies: z
        .number()
        .min(0, "Copies can not be negative"),

    available: z
        .boolean()
        .default(true)
        .optional()
})