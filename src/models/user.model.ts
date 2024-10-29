import { model, Schema } from "mongoose";

export interface IUser {
    username: string,
    password: string,
    isAdmin: boolean

}


const userSchema = new Schema<IUser>({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true}
})

export const User = model<IUser>('User', userSchema)