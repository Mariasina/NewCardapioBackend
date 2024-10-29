import jwt from "jsonwebtoken"

export interface IJwtPayload extends jwt.JwtPayload{
    userId: number
    isAdmin: boolean
}