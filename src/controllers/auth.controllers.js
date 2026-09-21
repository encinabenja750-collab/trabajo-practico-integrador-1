import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";

export const register = async (req, res) => {
  const {
    username,
    email,
    password,
    firs_name,
    last_name,
    biography,
    avatar_url,
    birth_date,
  } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const nuevoUsuario = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role: "user",
    });

    const nuevoPerfil = await ProfileModel.create({
      user_id: nuevoUsuario.id,
      firs_name,
      last_name,
      biography: biography || null,
      avatar_url: avatar_url || null,
      birth_date: birth_date || null,
    });

    return res.status(201).json({
      message: "Usuario registrado exitosamente junto con su perfil.",
      data: {
        id: nuevoUsuario.id,
        username: nuevoUsuario.username,
        email: nuevoUsuario.email,
        profile: {
          firs_name: nuevoPerfil.firs_name,
          last_name: nuevoPerfil.last_name,
        },
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocurrió un error inesperado al registrar el usuario",
      error: error.message,
    });
  }
};
