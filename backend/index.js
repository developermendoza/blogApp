import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { dbConnection } from "./db/conn.js";
import { getPosts } from "./routes/posts.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGwtSUTJ_W9rO2QLcHWTfz76U9GOOPRi0",
  authDomain: "blogapp-48df7.firebaseapp.com",
  projectId: "blogapp-48df7",
  storageBucket: "blogapp-48df7.appspot.com",
  messagingSenderId: "621784057473",
  appId: "1:621784057473:web:46d83625f56dc39a5f6f80",
  measurementId: "G-83WW8FDH0W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// const app = express();
// const port = process.env.PORT || 8080;
// app.use(cors());
// dotenv.config();

// dbConnection();

// // create application/json parser
// const jsonParser = bodyParser.json();

// // create application/x-www-form-urlencoded parser
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

// app.get("/", urlencodedParser, getPosts);

// app.listen(port, () => console.log(`Server running on port: ${port}`));
