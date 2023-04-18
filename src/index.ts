import express from "express";
import bodyParser from "body-parser";
import apiRoutes from "./routes/";

import { MongoDBService } from "./services/mongodb-service";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api", apiRoutes);

const mongoClient = new MongoDBService();
mongoClient
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
