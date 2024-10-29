import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { config } from "dotenv";
import jwt from "jsonwebtoken"
import { IJwtPayload } from "../types/jwt.types";


config();

let secretToken: string = process.env.SECRET_TOKEN  ?? "defaulttoken"

if (secretToken === "defaulttoken") {
    console.error("Secret token is undefined, using the default value!")
}


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token)
        throw new AppError("Empty authorization headers", 401)
    
    const jwtString = token.replace("Bearer", "").trim()

    const decoded = await jwt.verify(jwtString, secretToken) as IJwtPayload

    res.locals.sessionInfo = decoded
    next()
}

export {secretToken}