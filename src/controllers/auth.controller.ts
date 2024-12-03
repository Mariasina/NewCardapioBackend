import { Request, Response } from "express";
import { ICreateAdminResponse, ILoginResponse } from "../dtos/auth.dto";
import { createUserService, loginUserService } from "../services/auth.services";
import { createAdminRequest, userLoginRequest } from "../schemas/user.schemas";
import { AppError } from "../errors";


export const createAdmin = async (req: Request<{}, {}, createAdminRequest>, res: Response<ICreateAdminResponse>) => {
    const { password, username, isAdmin } = req.body

    const user = await createUserService(username, password, isAdmin)

    if (!user)
        throw new AppError("Failed to create user!", 400)

    res.json({
        message: `Admin account (${username}) was created!`,
        userdata: { username: user.username, password, isAdmin }
    })
}


export const userLogin = async (req: Request<{}, {}, userLoginRequest>, res: Response<ILoginResponse>) => {
    const token = await loginUserService(req.body.username, req.body.password)

    res.json({ message: "Login success!", token })
}
