import { Router } from "express";
import { validate } from "../middlewares/validation.middleware";
import { createDishSchema } from "../schemas/dish.schemas";
import { createDishController, getDishController } from "../controllers/dish.controller";

const dishRoutes = Router()

dishRoutes.get("/dish", getDishController)
dishRoutes.post("/dish", validate(createDishSchema), createDishController)

export default dishRoutes