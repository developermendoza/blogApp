import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { dbConnection } from "./db/conn.js";
import { getPosts } from "./routes/posts.js";

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
dotenv.config();

dbConnection();

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", urlencodedParser, getPosts);

app.listen(port, () => console.log(`Server running on port: ${port}`));
