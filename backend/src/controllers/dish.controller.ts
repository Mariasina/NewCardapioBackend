import { Request, Response } from "express";
import { createDishRequest } from "../schemas/dish.schemas";
import { IMessageResponse } from "../dtos";
import { createDishService, getDishesByRestaurantService, getDishService } from "../services/dish.services";
import { IIngredient } from "../models/ingredient.model";
import { IDish } from "../models/dish.model";
import { DishListResponse } from "../dtos/dish.dto";

export const getDishController = async (req: Request, res: Response<DishListResponse>) => {
    const dishes = await getDishService()

    res.json({
        message: "Success fetching dishes!",
        dishes
    })
}

export const getDishesByRestaurantController = async (req: Request, res: Response<IMessageResponse>) => {
    const { id } = req.params; // Pega o ID do parâmetro da URL

    const dish = await getDishesByRestaurantService(id);

    res.json({
        message: "Successfully fetched the dish",
    });
}

export const createDishController = async (req: Request<{}, {}, createDishRequest>, res: Response<IDish>) => {
    const {name, ingredients} = req.body


    const newDish = await createDishService(name, (ingredients as IIngredient[]))

    res.json(newDish)
}