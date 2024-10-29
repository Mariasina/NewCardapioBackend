import { z } from "zod";

export const createRestaurantSchema = z.object({
    name: z.string({ required_error: "Invalid name!" }).min(1),
    description: z.string({ required_error: "Invalid description!" }).min(1),
    dishes: z.array(z.string({ required_error: "Invalid dish!" }))
})

export type createRestaurantRequest = z.infer<typeof createRestaurantSchema>
