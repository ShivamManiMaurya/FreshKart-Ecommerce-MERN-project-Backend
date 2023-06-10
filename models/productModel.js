import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: Number,
    discription: String,
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
