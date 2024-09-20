import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

// Load env variables
import dotenv from "dotenv";
dotenv.config();
// Load config
import { APP_CONFIG } from "@constants/config.constant";
// Load router
import AppRouter from "@routers/app.router";
import { getAuth } from "./middlewares/auth.middleware";
import {
  handleGeneralErrors,
  handleRoutingError,
} from "./middlewares/error.middleware";

const app: Express = express();
const port = process.env.PORT || APP_CONFIG.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/v1", getAuth, AppRouter);
app.use(handleGeneralErrors);
app.use(handleRoutingError);

mongoose.connect(APP_CONFIG.MONGO_URL).then(() => {
  console.log("Connected to database");
  app.listen(port, () => {
    console.log(`[server]: Server is running on port ${port}`);
  });
});
