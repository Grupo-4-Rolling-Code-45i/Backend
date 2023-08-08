const jwt = require("jsonwebtoken");
const { Usuario } = require("../model/usuario");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const { id } = jwt.verify(token, process.env.SECRET_JWT);
    req.id = id;

    const user = await Usuario.findById(id);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;