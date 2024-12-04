import { Request, Response } from "express"
import { createMenuRequest } from "../schemas/menu.schemas"
import { IMessageResponse } from "../dtos"
import { createMenuService, getMenuByDateService, getMenusService } from "../services/menu.services"
import { MenuListResponse } from "../dtos/menu.dto"
import { AppError } from "../errors"

export const getMenusController = async (req: Request, res: Response<MenuListResponse>) => {
    const {page, limit} = req.query

    if (isNaN(parseInt(page as string)) || isNaN(parseInt(limit as string))) {
        throw new AppError("Invalid Params", 400)
    }

    const menus = await getMenusService(Number(page), Number(limit))

    res.json({
        message: "Succesfully fetched the menu list!",
        ...menus
    })
}

export const getMenuByDateController = async (req: Request, res: Response<any>) => {
    const { date } = req.params; // Pega o ID do parâmetro da URL
    
    let convertedDate: Date = new Date(date)

    const menu = await getMenuByDateService(convertedDate);

    res.json({
        message: "Successfully fetched the menu",
        menu,
    });
}

export const createMenuController = async(req: Request<{}, {}, createMenuRequest>, res: Response<IMessageResponse>) => {
    const { date, restaurants} = req.body


    const newMenu = await createMenuService(new Date(date), restaurants)
    
    res.json({
        message: `Menu for (${date}) was created!`
    })

}