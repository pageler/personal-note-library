import express from "express";
import {
    registerUser,
    authUser,
    updateUserProfile,
} from "../controllers/UserControllers.js";
import { protect } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").post(protect, updateUserProfile);

export default router;
