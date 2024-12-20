import { ObjectId } from "mongoose";
import { AppError } from "../errors";
import { Dish, IDish } from "../models/dish.model";
import Ingredient, { IIngredient } from "../models/ingredient.model";
import { IRestaurant, Restaurant } from "../models/restaurant.model";
import { getIngredientByDishService, getIngredientInfoByID } from "./ingredient.services";

export type DishFullObject = {
    id: string,
    name: string,
    ingredients: IIngredient[]
}

const getDishInfo = async (dish: any) => {
    return {
        id: dish._id,
        name: dish.name,
        ingredients: await Promise.all(dish.ingredients.map(async (ingredient: any) => await getIngredientInfoByID(ingredient)))
    };
};

export const getDishService = async () => {
    const dishes: (IDish & {_id: ObjectId})[] = await Dish.find();
    return await Promise.all(dishes.map(async dish => await getDishInfo(dish)));
};

export const createDishService = async (name: string, ingredients: IIngredient[]) => {
    const exists = await Dish.findOne({name})

    if (exists) {
        return exists
    }

    const ingredientList = await Promise.all(
        ingredients.map(async (x) => {
            const entity = await Ingredient.findOne({ name: x.name });

            if (!entity)
                
                return await Ingredient.create(x)

            return entity
        })
    );

    const ingredientIds = ingredientList.map(x => x._id);
    
    const newDish = await Dish.create({ name, ingredients: ingredientIds });

    return newDish;
};

export const getDishesByRestaurantService = async (restaurantId: string) => {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
        throw new AppError("Restaurant not found!", 404);
    }

    const dishes = await Promise.all(restaurant.dishes.map(async (value) => {
        const dish: (IDish & {_id: ObjectId}) | null = await Dish.findById(value.toString());

        if (!dish) return undefined;

        const ingredientList = await getIngredientByDishService(value.toString());
        
        return { id: dish._id, name: dish.name, ingredients: ingredientList}
    }));
    
    return dishes.filter(value => value !== undefined);
};
