import { z } from "zod";

export const createAdminSchema = z.object({
    username: z.string({ required_error: "Username is required!"}).min(1),
    password: z.string({ required_error: "Please, provide a password!"}).min(6),
    isAdmin: z.boolean({ required_error: "Please check if admin"})
})

export type createAdminRequest = z.infer<typeof createAdminSchema>


export const userLoginSchema = z.object({
    username: z.string({ required_error: "Empty username!"}).min(1),
    password: z.string({ required_error: "Empty password!"}).min(6)
})

export type userLoginRequest = z.infer<typeof userLoginSchema>