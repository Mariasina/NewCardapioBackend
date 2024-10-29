import { User } from "../models/user.model"

export const getUserService = async () => {
    return await User.find()
}
