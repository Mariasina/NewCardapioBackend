import { ObjectId } from "mongoose";
import { AppError } from "../errors";
import { Dish, IDish } from "../models/dish.model";
import Ingredient, { IIngredient } from "../models/ingredient.model";
import { IRestaurant, Restaurant } from "../models/restaurant.model";
import { getIngredientByDishService } from "./ingredient.services";

const getDishInfo = (dish: any) => {
    return {
        id: dish._id,
        name: dish.name,
        ingredients: dish.ingredients // You might want to return ingredient info here
    };
};

export const getDishService = async () => {
    const dishes: (IDish & {_id: ObjectId})[] = await Dish.find();
    return dishes.map(dish => getDishInfo(dish));
};

export const createDishService = async (name: string, ingredients: IIngredient[]) => {
    const ingredientList = await Promise.all(
        ingredients.map(async (x) => {
            const entity = await Ingredient.findOne({ name: x.name });
            return entity ?? await Ingredient.create(x);
        })
    );

    const ingredientIds = ingredientList.map(x => x._id);
    
    const newDish = await Dish.create({ name, ingredients: ingredientIds });

    return newDish;
};

export const getDishesByRestaurantService = async (restaurantId: string) => {
    const restaurant = await Restaurant.findById(restaurantId);
    console.log(restaurantId, restaurant)
    if (!restaurant) {
        throw new AppError("Restaurant not found!", 404);
    }

    const dishes = await Promise.all(restaurant.dishes.map(async (value) => {
        const dish: (IDish & {_id: ObjectId}) | null = await Dish.findById(value._id);

        if (!dish) return undefined;

        const ingredientList = await getIngredientByDishService(value._id.toString());

        return getDishInfo({
            ...dish,
            ingredients: ingredientList
        });
    }));

    return dishes.filter(value => value !== undefined);
};
