import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./config/db.js";
import todoRoutes from "./routes/todo.route.js";
import cors from "cors";
import path from "path";
const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/todos",todoRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontent/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontent","dist","index.html"));
    });
}

app.listen(PORT, ()=>{
    console.log("Server started  at http://localhost:5000");
});

