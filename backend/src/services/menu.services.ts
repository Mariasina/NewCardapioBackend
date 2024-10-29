import { AppError } from "../errors";
import { Menu, IMenu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";
import { getRestaurantByIdService } from "./restaurant.services"; // Adjust import as needed

// Helper function to format menu info
const getMenuInfo = (menu: any) => {
    return {
        id: menu._id,
        date: menu.date,
        restaurants: menu.restaurants // This will be populated later
    };
};

export const getMenusService = async () => {
    const menus: IMenu[] = await Menu.find();
    return menus.map(menu => getMenuInfo(menu));
};

export const createMenuService = async (date: Date, restaurants: string[]) => {
    const restaurantIds = await Promise.all(restaurants.map(async (restaurantId) => {
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            throw new AppError("Invalid restaurant", 404);
        }
        return restaurant._id;
    }));

    const newMenu = await Menu.create({ date, restaurants: restaurantIds });
    return getMenuInfo(newMenu);
};

export const getMenuByDateService = async (date: Date) => {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const menu = await Menu.findOne({ 
        date: { $gte: startOfDay, $lte: endOfDay } 
    });

    if (!menu) {
        throw new AppError("Menu not found for the specified date!", 404);
    }

    const restaurants = await Promise.all(menu.restaurants.map(async (restaurantId) => {
        return await getRestaurantByIdService(restaurantId.toString());
    }));

    return {
        ...getMenuInfo(menu),
        restaurants // Add restaurant details to the menu info
    };
};
