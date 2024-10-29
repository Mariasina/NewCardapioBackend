import { z } from "zod";

export const createMenuSchema = z.object({
    date: z.string({required_error: "Invalid date!"}).date(),
    restaurants: z.array(z.string({required_error: "Invalid restaurant!"}))
})

export type createMenuRequest = z.infer<typeof createMenuSchema>
