import { body, param } from "express-validator";
import { TagModel } from "../models/tag.model.js";

export const validarCrearTag = [
  body("name")
    .notEmpty()
    .withMessage("El nombre de la etiqueta es obligatorio.")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres.")

    .custom((value) => {
      if (value.includes(" ")) {
        throw new Error("El nombre de la etiqueta no puede contener espacios.");
      }
      return true;
    })

    .custom(async (value) => {
      const tagExiste = await TagModel.findOne({
        where: { name: value.trim() },
      });
      if (tagExiste) {
        throw new Error(
          "Esta etiqueta ya se encuentra registrada en el sistema.",
        );
      }
      return true;
    }),
];

export const validarIdTag = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID de la etiqueta debe ser un número entero positivo."),

  param("id").custom(async (value) => {
    const tagExiste = await TagModel.findByPk(value);
    if (!tagExiste) {
      throw new Error("La etiqueta especificada no existe en el sistema.");
    }
    return true;
  }),
];
