import { Request, Response } from "express";
import { createIngredientRequest } from "../schemas/ingredient.schemas";
import { IMessageResponse } from "../dtos";
import { createIngredientService, getIngredientByDishService, getIngredientService } from "../services/ingredient.services";
import { IngredientListResponse } from "../dtos/ingredient.dto";

export const getIngredientController = async (req: Request, res: Response<any>) => {
    const ingredients = await getIngredientService()

    res.json({
        message: "Succesfully fetched ingredient list!",
        ingredients
    })
}

export const getIngredientByDishController = async (req: Request, res: Response<IMessageResponse>) => {
    const { id } = req.params; // Pega o ID do parâmetro da URL

    const ingredient = await getIngredientByDishService(id);

    res.json({
        message: "Successfully fetched the ingredient",
    });
}

export const createIngredientController = async(req: Request<{}, {}, createIngredientRequest>, res: Response<IMessageResponse>) => {
    const {name, hasGluten, isAnimal, isMeat} = req.body

    await createIngredientService({name, hasGluten, isAnimal, isMeat})

    res.json({
        message: `Ingredient (${name}) was created!`
    })
}