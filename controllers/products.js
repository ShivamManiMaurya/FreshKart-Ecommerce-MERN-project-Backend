import mongoose from "mongoose";
import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
    try {
        const data = Product(req.body);
        await data.save();
        res.send({ message: "Product added successfully", alert: true });
    } catch (error) {
        console.log(error);
    }
};

export const getProducts = async (req, res) => {
    try {
        const data = await Product.find({});
        res.send(JSON.stringify(data));
    } catch (error) {
        console.log("getProducts error = ", error);
    }
};

export const deleteProduct = async (req, res) => {
    const _id = new mongoose.Types.ObjectId(req.params);
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res
            .status(404)
            .send("No product found of this Id in the Database.");
    }

    try {
        await Product.findByIdAndDelete(_id);

        res.json({ message: "Product deleted successfully!" });
    } catch (error) {
        console.log(error);
    }
};
