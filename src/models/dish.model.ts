import { Schema, Types, model } from "mongoose"
import Ingredient, { IIngredient } from "./ingredient.model"

export interface IDish {
    name: string,
    ingredients: Types.ObjectId[]
}

const dishSchema = new Schema<IDish>({
    name: {type: String, required: true, unique: false},
    ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredients', required: true }]
})

export const Dish = model("Dishes", dishSchema)