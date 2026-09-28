import { ArticleModel } from "../models/article.model.js";

export const ownerMiddleware = async (req, res, next) => {
  const { id } = req.params;

  try {
    const articulo = await ArticleModel.findByPk(id);
    if (!articulo) {
      return res
        .status(404)
        .json({ message: "El artículo solicitado no existe en el sistema" });
    }
    if (articulo.user_id !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({
          message: "Acceso denegado. No tienes los permisos requeridos",
        });
    }
    req.article = articulo;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocurrió un error interno al verificar la propiedad del recurso",
      error: error.message,
    });
  }
};
