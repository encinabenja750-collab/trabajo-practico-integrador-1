import { Router } from "express";
import { register } from "../controllers/auth.controllers.js";

export const authRoutes = Router();

authRoutes.post("/register", register);