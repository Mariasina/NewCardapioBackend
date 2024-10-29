import { Request, Response } from "express"
import { UserListResponse } from "../dtos/user.dto"
import { getUserService } from "../services/user.services"

export const getUserController = async (req: Request, res: Response<UserListResponse>) => {
    const users = await getUserService()

    res.json({
        message: "Succesfully fetched the user list!",
        users
    })
}