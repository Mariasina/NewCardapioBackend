import { AppError } from "../errors";
import { Menu, IMenu } from "../models/menu.model";
import { IRestaurant, Restaurant } from "../models/restaurant.model";
import { createRestaurantService, getRestaurantByIdService } from "./restaurant.services"; // Adjust import as needed

// Helper function to format menu info
const getMenuInfo = (menu: any) => {
    return {
        id: menu._id,
        date: menu.date,
        restaurants: menu.restaurants // This will be populated later
    };
};

export const getMenusService = async (page: number, limit: number) => {
    const skip = (page - 1) * limit

    const pages = Math.ceil(await Menu.countDocuments() / limit)

    const menus: IMenu[] = await Menu.find({}, {}, {skip, limit});
    return { pages, menus: menus.map(menu => getMenuInfo(menu))};
};

export const createMenuService = async (date: Date, restaurants: any[]) => {
    const restaurantIds = await Promise.all(restaurants.map(async (value) => {
        const r: any = await createRestaurantService(value.name, value.description, value.dishes)

        return r._id
    }))

    const newMenu = await Menu.create({ date, restaurants: restaurantIds });
    return getMenuInfo(newMenu);
};

export const getMenuByDateService = async (date: Date) => {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(24, 0, 0, 0));

    const menu = await Menu.findOne({ 
        date: { $gte: startOfDay, $lte: endOfDay } 
    });

    console.log(menu)

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
