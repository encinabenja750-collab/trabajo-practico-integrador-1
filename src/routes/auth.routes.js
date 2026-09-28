import { Router } from "express";
import {
  register,
  login,
  logout,
  obtenerPerfil,
  actualizarPerfil,
} from "../controllers/auth.controllers.js";

export const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/profile", obtenerPerfil);
authRoutes.put("/profile", actualizarPerfil);
