import { TagModel } from "../models/tag.model.js";
import { ArticleModel } from "../models/article.model.js";
import { matchedData } from "express-validator";

export const crearTag = async (req, res) => {
  try {
    const datosLimpios = matchedData(req);
    const nuevaTag = await TagModel.create({
      name: datosLimpios.name.trim(),
    });

    return res.status(201).json({
      message: "Etiqueta creada con éxito.",
      data: nuevaTag,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Error interno al crear etiqueta",
        error: error.message,
      });
  }
};

export const obtenerTags = async (req, res) => {
  try {
    const tags = await TagModel.findAll();
    return res.status(200).json({ data: tags });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al listar etiquetas", error: error.message });
  }
};

export const obtenerTagPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await TagModel.findByPk(id, {
      include: {
        model: ArticleModel,
        as: "articles",
        through: { attributes: [] },
      },
    });
    return res.status(200).json({ data: tag });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al buscar la etiqueta", error: error.message });
  }
};

export const actualizarTag = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await TagModel.findByPk(id);
    const datosLimpios = matchedData(req);

    await tag.update({ name: datosLimpios.name.trim() });
    return res
      .status(200)
      .json({ message: "Etiqueta actualizada con éxito.", data: tag });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al actualizar etiqueta", error: error.message });
  }
};

export const eliminarTag = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await TagModel.findByPk(id);
    await tag.destroy(); // Borrado físico
    return res
      .status(200)
      .json({ message: "Etiqueta eliminada con éxito de la base de datos." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al eliminar etiqueta", error: error.message });
  }
};
