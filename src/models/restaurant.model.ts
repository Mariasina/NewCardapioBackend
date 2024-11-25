import { model, Schema, Types } from "mongoose"

export type IRestaurant = {
    name: string,
    description: string,
    dishes: Types.ObjectId[]
}

const restaurantSchema = new Schema<IRestaurant>({
    name: {type: String, required: true, unique: false},
    dishes: [{ type: Schema.Types.ObjectId, ref: 'Dishes', required: true }]
})

export const Restaurant = model<IRestaurant>("Restaurants", restaurantSchema)
