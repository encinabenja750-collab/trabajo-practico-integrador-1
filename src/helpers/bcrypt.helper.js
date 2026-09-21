import { hash, compare } from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password) => {
  try {
    return await hash(password, saltRounds);
  } catch (error) {
    throw new Error(
      "Error interno al procesar el hasheo de la contraseña: " + error.message,
    );
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    return await compare(password, hashedPassword);
  } catch (error) {
    throw new Error(
      "Error interno al comparar las credenciales: " + error.message,
    );
  }
};
