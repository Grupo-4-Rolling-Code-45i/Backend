const express = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = express.response, next) => {
  const token = req.header("token");
  console.log(token);
  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "No hay token en la petición",
    });
  }
  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT);

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
