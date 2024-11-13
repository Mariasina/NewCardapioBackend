import { ObjectId } from "mongoose"
import { AppError } from "../errors"
import { Dish, IDish } from "../models/dish.model"
import Ingredient, { IIngredient } from "../models/ingredient.model"

const getIngredientInfo = (ingredient: IIngredient & {_id: ObjectId}) => {
    const value = {
        id: ingredient._id,
        name: ingredient.name,
        isMeat: ingredient.isMeat,
        isAnimal: ingredient.isAnimal,
        hasGluten: ingredient.hasGluten
    }
    return value
}

export const getIngredientService = async (query = "") => {
    if (query !== "") 
        return await getIngredientInfoByID(query)

    const ingredients: (IIngredient & {_id: ObjectId})[] = await Ingredient.find()

    const ingredientList = ingredients.map(value => getIngredientInfo(value))
    
    return ingredientList
}
export const createIngredientService = async (ingredient: IIngredient) => {
    const newIngredient = await Ingredient.create(ingredient)

    return newIngredient
}

export const getIngredientByDishService = async (dishId: string) => {
    const dish = await Dish.findById(dishId)

    if (!dish)
        throw new AppError("Dish not found!", 404)

    const ingredients = await Promise.all(dish.ingredients.map(async value => {
        console.log("Valor id:" + value._id)
        console.log("Valor id:" + value._id._bsontype)
        const ingredient: (IIngredient & {_id: ObjectId}) | null = await Ingredient.findById(value._id)

        if (!ingredient)
            return undefined

        return getIngredientInfo(ingredient)
    }))

    return ingredients.filter(value => value !== undefined)
}

export const getIngredientInfoByID = async (ingredientId: string) => {
    const ingredient: (IIngredient & {_id: ObjectId}) | null = await Ingredient.findById(ingredientId)

    if (!ingredient)
        throw new AppError("Ingredient not found!", 404)


    return getIngredientInfo(ingredient)
}