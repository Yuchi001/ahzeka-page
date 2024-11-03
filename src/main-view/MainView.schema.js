import { z } from 'zod';

export const formSchema = z.object({
    name: z.string()
        .min(2, "Please input your name")
        .max(30, "Name can't be longer than 30 characters"),
    email: z.string()
        .email("Invalid e-mail")
        .min(1, "Please input your e-mail")
        .max(30, "E-mail can't be longer than 100 characters."),
    phone: z.string(),
    message: z.string()
        .min(3, "Please input your message")
        .max(500, "Message can't be longer than 500 characters"),
})