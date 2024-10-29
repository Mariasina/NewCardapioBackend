import { IMessageResponse } from ".";
import { IUser } from "../models/user.model";

export interface UserListResponse extends IMessageResponse {
    users: IUser[]
}