import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
    // console.log(req.body);
    try {
        const data = Product(req.body);
        await data.save();
        res.send({ message: "Product added successfully", alert: true });
    } catch (error) {
        console.log(error);
    }
};
