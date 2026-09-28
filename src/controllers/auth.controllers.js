import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";
import { comparePassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { where } from "sequelize";

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

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const usuario = await UserModel.findOne({
      where: { username },
      include: {
        model: ProfileModel,
        as: "profile",
      },
    });
    if (!usuario) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const passwordValido = await comparePassword(password, usuario.password);

    if (!passwordValido) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const token = generateToken({
      id: usuario.id,
      username: usuario.username,
      role: usuario.role,
      firs_name: usuario.profile?.firs_name || "",
      last_name: usuario.profile?.last_name || "",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      sameSite: "strict",
      secure: false,
    });
    return res.status(200).json({
      message: "Login exitoso. Sesión iniciada",
      user: {
        id: usuario.id,
        username: usuario.username,
        role: usuario.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocurrió un error inesperado al iniciar sesión",
      error: error.message,
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    message: "Logout exitoso. Sesión cerrada correctamente",
  });
};
