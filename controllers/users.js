// import mongoose from "mongoose";
import User from "../models/userModel.js";
// import user from "../routes/user";

// export const getUser = async (req, res) => {
//     try {
//     } catch (error) {}
// };

export const createUser = async (req, res) => {
    const { email } = req.body;

    try {
        const result = await User.findOne({ email: email });
        if (result) {
            res.send({ message: "email is already registered.", alert: false });
        } else {
            const data = User(req.body);
            await data.save();
            // res.status(201).json(data);
            res.send({ message: "successfully signed up", alert: true });
        }
    } catch (error) {
        console.log(error);
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const filter = [{ email: email }, { password: password }];

    try {
        const haveAccount = await User.findOne({ $and: filter });
        // console.log(haveAccount);
        if (haveAccount) {
            res.send({
                message: "User and Pasword is registered...Good",
                alert: true,
            });
            // console.log("registered ");
        } else {
            res.send({ message: "User of Password is wrong", alert: false });
            // console.log("not registerd");
        }
    } catch (error) {
        console.log(error);
    }
};
