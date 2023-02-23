import express from "express"
import bodyParser from "body-parser"
import apiRoutes from "./routes/"

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use("/api", apiRoutes)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
