const morgan = require("morgan");
const cors = require("cors");
const express = require("express");

function addConfig(app) {
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cors());
}

module.exports = addConfig;
