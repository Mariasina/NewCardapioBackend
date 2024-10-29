import { Router } from "express";
import { validate } from "../middlewares/validation.middleware";
import { createRestaurantSchema } from "../schemas/restaurant.schemas";
import { createRestaurantController, getRestaurantController } from "../controllers/restaurant.controller";

const restaurantRoutes = Router()

restaurantRoutes.get("/restaurant", getRestaurantController)
restaurantRoutes.post("/restaurant", validate(createRestaurantSchema), createRestaurantController)

export default restaurantRoutes