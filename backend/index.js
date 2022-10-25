import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./db/conn.js";

dotenv.config();
dbConnection();

const app = express();

const port = process.env.PORT || 8080;
app.listen(() => console.log(`App listening on port: ${port}`));
