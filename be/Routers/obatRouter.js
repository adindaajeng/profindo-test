const express = require("express");
const routers = express.Router();
const obatController = require("../Controllers/obatController");

routers.get("/", obatController.getObat);
routers.post("/", obatController.addObat);
routers.put("/", obatController.editObat);
routers.delete("/:kodeObat", obatController.deleteObat);

module.exports = routers;
