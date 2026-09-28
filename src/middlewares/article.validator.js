import { body, param } from "express-validator";

export const validarCrearArticulo = [
  body("title")
    .notEmpty()
    .withMessage("El título del artículo es obligatorio")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),

  body("content")
    .notEmpty()
    .withMessage("El contenido del artículo es obligatorio")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres"),

  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El resumen no puede superar los 500 caracteres"),

  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage(
      "El estado del artículo solo puede ser 'published' o 'archived'",
    ),
];

export const validarIdArticulo = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID del artículo debe ser un número entero positivo"),
];
