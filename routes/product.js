import express from "express";
import { createProduct } from "../controllers/products.js";

const product = express();

product.post("/addproduct", createProduct);

export default product;
