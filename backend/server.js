import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import connectMongo from './config/database.js';

dotenv.config(); // Reads the contents of the .env files and add variables to process.env

connectMongo(); //Connect to MongoDB database

const port = process.env.PORT || 3000;


const app = express();

// Middleware to parse JSON in the request body
app.use(express.json());

// Middleware function to parse the incoming URL-encoded payloads. Ex: html submit form
app.use(express.urlencoded({extended: true}));

app.use(cookieParser())

app.use("/api/users", userRoutes)

app.use(notFound); //Middleware error handling function for route not found
app.use(errorHandler); //Middleware for general error handling function

app.get("/", (request, response) => response.send("Server is ready"))

app.listen(port, console.log(`Server is running on port ${port}`))

