const { validationResult } = require("express-validator");

const verificarErrores = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.mapped(),
    });
  }
};

const crearProducto = (req, res) => {
  verificarErrores(req, res);
  return res.json({ msg: req.body });
};

module.exports = { crearProducto };
