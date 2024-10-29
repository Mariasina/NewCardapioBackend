import { Router } from "express";
import { validate } from "../middlewares/validation.middleware";
import { createMenuSchema } from "../schemas/menu.schemas";
import { createMenuController, getMenuByDateController, getMenusController } from "../controllers/menu.controller";
import { getMenuByDateService } from "../services/menu.services";

const menuRoutes = Router()

menuRoutes.get("/menu", getMenusController)
menuRoutes.get("/menuInfo/:date", getMenuByDateController)
menuRoutes.post("/menu", validate(createMenuSchema), createMenuController)

export default menuRoutes