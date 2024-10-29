import { IMessageResponse } from ".";
import { IIngredient } from "../models/ingredient.model";

export interface IngredientListResponse extends IMessageResponse {
    ingredients: IIngredient[]
}