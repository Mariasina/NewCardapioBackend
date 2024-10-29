import { IMessageResponse } from ".";
import { IDish } from "../models/dish.model";

export interface DishListResponse extends IMessageResponse {
    dishes: IDish[]
}