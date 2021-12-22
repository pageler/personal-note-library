import express from "express";
import { registerUser } from "../controllers/UserControllers";

const router = express.Router();

router.route("/").post(registerUser);

export default router;
