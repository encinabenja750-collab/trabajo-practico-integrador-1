import { Router } from "express";
import {
  crearArticulo,
  obtenerArticulos,
  obtenerArticulosUsuario,
  actualizarArticulo,
  eliminarArticulo,
} from "../controllers/article.controllers.js";
import {
  validarCrearArticulo,
  validarIdArticulo,
} from "../middlewares/article.validator.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";


export const articleRoutes = Router();

articleRoutes.use(authMiddleware);

articleRoutes.post("/", [validarCrearArticulo, validarCampos], crearArticulo);
articleRoutes.get("/", obtenerArticulos);

articleRoutes.get("/user", obtenerArticulosUsuario);

articleRoutes.put(
  "/:id",
  [
    validarIdArticulo,
    validarCampos,
    ownerMiddleware,
    validarCrearArticulo,
    validarCampos,
  ],
  actualizarArticulo,
);
articleRoutes.delete(
  "/:id",
  [validarIdArticulo, validarCampos, ownerMiddleware],
  eliminarArticulo,
);
