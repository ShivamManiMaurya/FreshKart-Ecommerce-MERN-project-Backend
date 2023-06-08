import express from "express";
// import { getUser, createUser } from "../controllers/users";

const router = express();

// router.get("/signup", getUser);
console.log("ye chala");
router.post("/signup", (req, res) => {
    console.log("from router = ", req.body);
});

export default router;
