import { Router } from "express";
import {
    getCurrrentUser,
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();


// user registration route
router.route("/register").post(registerUser);

// login route

router.route("/login").post(loginUser);


// secured routes

// logout user
router.route("/logout").post(verifyJWT, logoutUser);

// refresh access token

router.route("/get-user").post(verifyJWT, getCurrrentUser);

export default router;
