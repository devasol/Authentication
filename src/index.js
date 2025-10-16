import express, { urlencoded } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

//Middlewares

app.use(json({ limit: "100mb" }));
app.use(urlencoded({ limit: "100mb", extended: true }));
