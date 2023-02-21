import express from "express"
import bodyParser from "body-parser"
import airplaneRoute from "./routes/airplanes"

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use("/api", airplaneRoute)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
