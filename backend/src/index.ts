import { config } from "dotenv"
import { app } from "./app";
import { connectDatabase } from "./database";

config();

(async () => {
    const port = process.env.PORT ?? 8080

    await connectDatabase((data) => {
        console.log(`Database connected! [${data.url}]`)
    })

    app.listen(port, () => {
        console.log(`Server Started! [http://localhost:${port}]`)
    })
})()