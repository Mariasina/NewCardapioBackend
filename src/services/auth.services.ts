import bcrypt from "bcryptjs"
import { AppError } from "../errors"
import jwt from "jsonwebtoken"
import { IJwtPayload } from "../types/jwt.types"
import { secretToken } from "../middlewares/auth.middleware"
import { User } from "../models/user.model"

export const createUserService = async (username: string, password: string, isAdmin: boolean) => {
    const userExists = await User.findOne({username})

    if (userExists)
        throw new AppError("Username is already registered!", 400)
    
    const saltRounds = 10

    const hashedPw = await bcrypt.hash(password, saltRounds)

    const user = await User.create({ username, password: hashedPw, isAdmin })

    return user
}


export const loginUserService = async (username: string, password: string) => {
    const user = await User.findOne({username})

    if (!user)
        throw new AppError("Username not found!", 404)

    const result = await bcrypt.compare(password, user.password)

    if (!result)
        throw new AppError("Unauthorized!", 401)

    const token = jwt.sign({
        sub: username, 
        userId: user.id, 
        isAdmin: user.isAdmin
    } as IJwtPayload, secretToken, {algorithm: "HS256", expiresIn: "24h"})

    return token;
}