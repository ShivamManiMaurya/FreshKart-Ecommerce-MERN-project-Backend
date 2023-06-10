import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
// import userModel from "./models/userModel.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// app.use(express.json());

app.use("/", userRouter);
app.use("/", productRouter);

app.get("/", (req, res) => {
    res.send("server is working ");
});

// app.post("/signup", (req, res) => {
//     console.log(req.body);
// });

// app.post("/newproduct", (req, res) => {
//     console.log("chala");
// });

const CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;
const PORT = process.env.PORT || 8080;

mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () => console.log(`server running on port ${PORT}`))
    )
    .catch((error) => console.log(error));
