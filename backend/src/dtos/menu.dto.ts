import { IMessageResponse } from ".";
import { IMenu } from "../models/menu.model";

export interface MenuListResponse extends IMessageResponse {
    menus: IMenu[]
}