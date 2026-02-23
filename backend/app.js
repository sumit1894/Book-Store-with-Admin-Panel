import express from "express"
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { conn } from "./DataBase/DBconnection.js";
import userRoutes from "./DataBase/routes/user.js";
import Book from "./DataBase/routes/book.js";
import favourites from "./DataBase/routes/favourites.js"
import Cart from "./DataBase/routes/card.js"
import Order from "./DataBase/routes/order.js"

app.use(cors());
app.use(express.json());
app.use("/api/v1", userRoutes);
app.use("/api/v1", Book);
app.use("/api/v1", favourites);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

//! creating port
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});