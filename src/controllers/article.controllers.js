import { ArticleModel } from "../models/article.model.js";
import { TagModel } from "../models/tag.model.js";
import { ArticleTagModel } from "../models/articleTag.model.js";
import { matchedData } from "express-validator";

// 1. CREAR ARTÍCULO (POST - Usuario Autenticado)
export const crearArticulo = async (req, res) => {
  try {
    const datosLimpios = matchedData(req);

    const nuevoArticulo = await ArticleModel.create({
      ...datosLimpios,
      user_id: req.user.id, // Inyectamos automáticamente el ID del usuario logueado
    });

    return res.status(201).json({
      message: "Artículo publicado con éxito.",
      data: nuevoArticulo,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al crear artículo", error: error.message });
  }
};

// 2. LISTAR ARTÍCULOS PUBLICADOS (GET - Abierto a Autenticados)
export const obtenerArticulos = async (req, res) => {
  try {
    const articulos = await ArticleModel.findAll({
      where: { status: "published" },
      include: { model: TagModel, as: "tags", through: { attributes: [] } }, // Trae sus etiquetas limpias
    });
    return res.status(200).json({ data: articulos });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al listar artículos", error: error.message });
  }
};

// 3. OBTENER ARTÍCULO DEL USUARIO LOGUEADO (GET /user - Página 5)
export const obtenerArticulosUsuario = async (req, res) => {
  try {
    const articulos = await ArticleModel.findAll({
      where: { user_id: req.user.id },
      include: { model: TagModel, as: "tags", through: { attributes: [] } },
    });
    return res.status(200).json({ data: articulos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al obtener tus artículos",
      error: error.message,
    });
  }
};

// 4. ACTUALIZAR ARTÍCULO (PUT - Solo Autor o Admin)
export const actualizarArticulo = async (req, res) => {
  try {
    // req.article ya viene cargado con el artículo original gracias a nuestro 'ownerMiddleware'
    const articulo = req.article;
    const datosLimpios = matchedData(req);

    await articulo.update(datosLimpios);

    return res.status(200).json({
      message: "Artículo actualizado con éxito.",
      data: articulo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al actualizar el artículo",
      error: error.message,
    });
  }
};

// 5. ELIMINAR CON ELIMINACIÓN EN CASCADA (DELETE - Solo Autor o Admin - Página 5)
export const eliminarArticulo = async (req, res) => {
  try {
    const articulo = req.article;

    // ELIMINACIÓN EN CASCADA (Página 5): Limpiamos la tabla intermedia antes de borrar el artículo
    await ArticleTagModel.destroy({ where: { article_id: articulo.id } });

    // Ahora sí, eliminamos el artículo físicamente (o lógicamente si le ponés paranoid)
    await articulo.destroy();

    return res.status(200).json({
      message:
        "Artículo y sus asociaciones eliminados con éxito (Cascada aplicada).",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al eliminar el artículo", error: error.message });
  }
};
