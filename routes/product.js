import express from "express";
import {
    createProduct,
    getProducts,
    deleteProduct,
} from "../controllers/products.js";

const product = express();

product.post("/addproduct", createProduct);
product.get("/showproducts", getProducts);
product.delete("/:id", deleteProduct);

export default product;
