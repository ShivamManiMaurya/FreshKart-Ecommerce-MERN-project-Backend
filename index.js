import express from "express";
import cors from "cors";
import mongoose from "mongoose";
// import userRouter from "./routes/router.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// app.use("/user", userRouter);

app.get("/", (req, res) => {
    res.send("server is running at 8080 ");
});

const CONNECTION_URL = "http://localhost:8080";
const PORT = process.env.PORT || 8080;

// mongoose
//     .connect(CONNECTION_URL, {
//         useNewUrlParser: true,
//         useUnifiedToplogy: true,
//     })
//     .then(() =>
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
//         .catch((error) => console.log(error.messae))
// );
