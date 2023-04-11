import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";

import routeIndex from "./routes/movies.js";
import userIndex from "./routes/users.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

app.use(cors());

app.use("/api/movies", routeIndex);
app.use("/api/users", userIndex);

const PORT = process.env.PORT;

mongoose.set("strictQuery", false);


mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Express is Listening  on port ${PORT}`);
    })
  )
  .catch((error) => {
    console.log(error);
  });
