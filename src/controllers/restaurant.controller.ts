import { Request, Response } from "express";
import { IMessageResponse } from "../dtos";
import { createRestaurantRequest } from "../schemas/restaurant.schemas";
import { createRestaurantService, getRestaurantByIdService, getRestaurantByMenuService, getRestaurantService } from "../services/restaurant.services";
import { IRestaurant } from "../models/restaurant.model";
import { RestaurantListResponse } from "../dtos/restaurant.dto";

export const getRestaurantController = async (req: Request, res: Response<RestaurantListResponse>) => {
    const restaurants = await getRestaurantService()

    res.json({
        message: "Succesfully fetched the restaurant list!",
        restaurants
    })
}

export const getRestaurantByMenuController = async (req: Request, res: Response<IMessageResponse>) => {
    const { id } = req.params; // Pega o ID do parâmetro da URL

    const restaurant = await getRestaurantByMenuService(id);

    res.json({
        message: "Successfully fetched the restaurant",
    });
}


export const createRestaurantController = async(req: Request<{}, {}, createRestaurantRequest>, res: Response<IMessageResponse>) => {
    const { name, description, dishes} = req.body

    const newRestaurant = await createRestaurantService(name, description, dishes)

    res.json({
        message: `Restaurant (${name}) was created!`
    })

}