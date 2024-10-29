import { z } from "zod";

export const createIngredientSchema = z.object({
    name: z.string({required_error: "Invalid name!"}).min(1),
    hasGluten: z.boolean({required_error: "Invalid value for has gluten!"}),
    isAnimal: z.boolean({required_error: "Invalid value for is animal!"}),
    isMeat: z.boolean({required_error: "Invalid value for is meat!"})
})

export type createIngredientRequest= z.infer<typeof createIngredientSchema>