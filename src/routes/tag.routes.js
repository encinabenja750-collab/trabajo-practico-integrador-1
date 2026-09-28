import { Router } from "express";
import {
  crearTag,
  obtenerTags,
  obtenerTagPorId,
  actualizarTag,
  eliminarTag,
} from "../controllers/tag.controllers.js";
import { validarCrearTag, validarIdTag } from "../middlewares/tag.validator.js";
import { validarCampos } from "../middlewares/validarCampos.js"; // El recolector general
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const tagRoutes = Router();

tagRoutes.use(authMiddleware);

tagRoutes.post(
  "/",
  [adminMiddleware, validarCrearTag, validarCampos],
  crearTag,
);

tagRoutes.get("/", obtenerTags);

tagRoutes.get(
  "/:id",
  [adminMiddleware, validarIdTag, validarCampos],
  obtenerTagPorId,
);

tagRoutes.put(
  "/:id",
  [adminMiddleware, validarIdTag, validarCrearTag, validarCampos],
  actualizarTag,
);

tagRoutes.delete(
  "/:id",
  [adminMiddleware, validarIdTag, validarCampos],
  eliminarTag,
);
