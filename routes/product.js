import express from "express";
import { createProduct, getProducts } from "../controllers/products.js";

const product = express();

product.post("/addproduct", createProduct);
product.get("/showproducts", getProducts);

export default product;
