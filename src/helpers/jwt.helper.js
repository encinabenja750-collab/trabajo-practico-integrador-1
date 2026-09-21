import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
    } catch (error) {
        throw new Error("Error interno al generar el token de sesión: " + error.message);
    }
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error("Token inválido o expirado: " + error.message);
    }
};