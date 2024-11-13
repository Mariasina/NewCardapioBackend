import { z } from "zod";
import { IDish } from "../models/dish.model";
import { DishFullObject } from "../services/dish.services";

const DishFullObjectSchema = z.object({
    id: z.string(),
    name: z.string(),
    ingredients: z.array(z.object({
        id: z.string(),
        name: z.string(),
        isMeat: z.boolean(),
        isAnimal: z.boolean(),
        hasGluten: z.boolean(),
    })),
});

export const createRestaurantSchema = z.object({
    name: z.string({ required_error: "Invalid name!" }).min(1),
    description: z.string({ required_error: "Invalid description!" }).min(1),
    dishes: z.array(DishFullObjectSchema, { required_error: "Invalid Dishes!"})
})

export type createRestaurantRequest = z.infer<typeof createRestaurantSchema>
