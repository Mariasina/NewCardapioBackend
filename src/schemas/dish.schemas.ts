import { z } from "zod";

export const createDishSchema = z.object({
    name: z.string({ required_error: "Invalid name!" }).min(1),
    ingredients: 
        z.array(z.object({
            name: z.string({required_error: "Invalid ingridient name!"}).min(1),
            hasGluten: z.boolean({required_error: "Missing field hasGluten on ingredient!"}),
            isAnimal: z.boolean({required_error: "Missing field isAnimal on ingredient!"}),
            isMeat: z.boolean({required_error: "Missing field isMeat on ingredient!"})
        }, {required_error: "Invalid ingredient!"}))
        .nonempty("Ingredients cannot be empty"),
});

export type createDishRequest = z.infer<typeof createDishSchema>