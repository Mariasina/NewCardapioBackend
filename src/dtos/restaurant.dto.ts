import { IMessageResponse } from ".";
import { IRestaurant } from "../models/restaurant.model";

export interface RestaurantListResponse extends IMessageResponse {
    restaurants: IRestaurant[]
}