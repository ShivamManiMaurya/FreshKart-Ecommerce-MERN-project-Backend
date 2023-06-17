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

const stripe = new Stripe(
    "sk_test_51NJWf9SBn3VU9HQMpgJBo1c66gc7vKDS5mkpQVUAopJiETBOWtkJCp963OthplmALm4Iq8uieQLKw5lyVgc9QhD2003XDEJh2U"
);

// const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/create-checkout-session", async (req, res) => {
    try {
        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_options: [
                { shipping_rate: "shr_1NJyNVSBn3VU9HQMeZiTQhp3" },
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

        const session = await stripe.checkout.sessions.create(params);
        // console.log(session)
        res.status(200).json(session.id);
    } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
    }
});
// ***************************************************************************************************

// This is your test secret API key.
// const stripe = new Stripe(
//     "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"
// );

// const calculateOrderAmount = (items) => {
//     // Replace this constant with a calculation of the order's amount
//     // Calculate the order total on the server to prevent
//     // people from directly manipulating the amount on the client
//     console.log("third");
//     return 1400;
// };

// app.post("/create-payment-intent", async (req, res) => {
//     const { items } = req.body;

//     console.log(items);
//     // Create a PaymentIntent with the order amount and currency
//     try {
//         console.log("first");
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: calculateOrderAmount(items),
//             currency: "inr",
//             automatic_payment_methods: {
//                 enabled: true,
//             },
//         });
//         console.log("second");
//         console.log(paymentIntent);
//         res.send({
//             clientSecret: paymentIntent.client_secret,
//         });
//     } catch (error) {
//         res.send(error);
//     }
// });

//////////////////////////////////////////////////////////////
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
