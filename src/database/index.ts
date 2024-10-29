import mongoose from "mongoose"

interface ICallbackArgs {
    url: string
}

export const connectDatabase = async (callback: (data: ICallbackArgs) => void) => {
    if (!process.env.DB_URL)
        throw "Database URL is not set on the .env/environment variables!"

    await mongoose.connect(process.env.DB_URL)

    callback({url: process.env.DB_URL})
}