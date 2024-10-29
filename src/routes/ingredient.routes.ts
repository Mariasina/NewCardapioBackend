import { Router } from "express";
import { validate } from "../middlewares/validation.middleware";
import { createIngredientSchema } from "../schemas/ingredient.schemas";
import { createIngredientController, getIngredientController } from "../controllers/ingredient.controller";

const ingredientRoutes = Router()

ingredientRoutes.get("/ingredient", getIngredientController)
ingredientRoutes.post("/ingredient", validate(createIngredientSchema), createIngredientController)

export default ingredientRoutes