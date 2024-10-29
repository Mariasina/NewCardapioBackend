import { Schema, Types, model } from "mongoose"

export type IMenu = {
    date: Date,
    restaurants: Types.ObjectId[]
}

const menuSchema = new Schema<IMenu>({
    date: {type: Schema.Types.Date, required: true, unique: true },
    restaurants: [{ type: Schema.Types.ObjectId, ref: 'Restaurants', required: true }]
})

export const Menu = model<IMenu>("Menu", menuSchema)