import express from "express";
import { createUser, loginUser } from "../controllers/users.js";

const user = express();

user.post("/signup", createUser);
user.post("/login", loginUser);

export default user;
