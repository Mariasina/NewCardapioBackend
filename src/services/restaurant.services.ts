import { ObjectId, Types } from "mongoose";
import { Dish, IDish } from "../models/dish.model";
import { AppError } from "../errors";
import { IRestaurant, Restaurant } from "../models/restaurant.model";
import { Menu } from "../models/menu.model";
import { createDishService, DishFullObject, getDishesByRestaurantService } from "./dish.services";

const getRestaurantInfo = (restaurant:any) => {
    return {
        id: restaurant._id,
        name: restaurant.name,
        description: restaurant.description,
        dishes: restaurant.dishes // You might want to populate dish data here
    }
}

export const getRestaurantService = async () => {
    const restaurants: (IRestaurant & {_id: ObjectId })[] = await Restaurant.find();
    return restaurants.map(restaurant => getRestaurantInfo(restaurant))
}

export const getRestaurantByIdService = async (id: string) => {
    const restaurant: IRestaurant & {_id: ObjectId } | null = await Restaurant.findById(id);
    if (!restaurant) {
        throw new AppError("Restaurant not found!", 404);
    }
    return {
        ...getRestaurantInfo(restaurant),
        dishes: await getDishesByRestaurantService(id)
    };
};

export const createRestaurantService = async(name: string, description: string, dishes: DishFullObject[]) => {
    let newDishes = dishes.filter(value => value.id === "")

    const registeredDishes = await Promise.all(newDishes.map(async (dish) => {
        const value = await createDishService(dish.name, dish.ingredients)
        dish.id = value._id.toString();

        return value
    }))

    const fullDishList = [...dishes.filter(value => value.id !== ""), ...registeredDishes]

    await Restaurant.create({name, description, dishes: fullDishList})
    
}

export const getRestaurantByMenuService = async (menuId: string) => {
    const menu = await Menu.findById(menuId);
    if (!menu) {
        throw new AppError("Menu not found!", 404);
    }

    const restaurants: (IRestaurant & {_id: ObjectId })[] = await Restaurant.find({ _id: { $in: menu.restaurants } });
    
    return await Promise.all(restaurants.map(restaurant => getRestaurantInfo(restaurant)).map(async value => {
        return {
            ...value,
            dishes: await getDishesByRestaurantService(value.id)
        }
    }))
}