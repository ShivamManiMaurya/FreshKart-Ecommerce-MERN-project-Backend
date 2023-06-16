import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import Stripe from "stripe";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", userRouter);
app.use("/", productRouter);

app.get("/", (req, res) => {
    res.send("server is working ");
});

// **************** Payment Gateway *************** \\
// console.log(process.env.STRIPE_SECRET_KEY);

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// app.post("/create-checkout-session", async (req, res) => {
//     // console.log(req.body);

//     try {
//         const params = {
//             submit_type: "pay",
//             mode: "payment",
//             payment_method_type: ["card"],
//             billing_address_collection: "auto",
//             shipping_options: [
//                 { shipping_rate: "shr_1NJYIHSBn3VU9HQMfv3oftCN" },
//             ],

//             line_items: req.body.map((item) => {
//                 return {
//                     price_data: {
//                         currency: "inr",
//                         product_data: {
//                             name: item.name,
//                             // images: [item.image],
//                         },
//                         unit_amount: item.price * 100,
//                     },

//                     adjustable_quantity: {
//                         enabled: true,
//                         minimum: 1,
//                     },
//                     quantity: item.qty,
//                 };
//             }),
//             success_url: `${process.env.FRONTEND_URL}/success`,
//             cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//         };

//         const session = await stripe.checkout.sessions.create(params);
//         console.log(session);
//         res.status(200).json(session.id);
//     } catch (error) {
//         res.json(error);
//     }
// });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// console.log(typeof process.env.STRIPE_SECRET_KEY);
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
    console.log("first");
    try {
        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_options: [
                { shipping_rate: "shr_1NJYIHSBn3VU9HQMfv3oftCN" },
            ],

            line_items: req.body.map((item) => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.name,
                            // images : [item.image]
                        },
                        unit_amount: item.price * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.qty,
                };
            }),

            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        };
        console.log("second");
        console.log("paramas = ", params.line_items);
        const session = await stripe.checkout.sessions.create(params);
        console.log("jfls = ", session);
        res.status(200).json(session.id);
    } catch (err) {
        res.status(err.statusCode || 500).json(err);
    }
});

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
