
const express = require("express");

const logger = require("morgan");


const cors = require("cors");


module.exports = (app) => {
  app.set("trust proxy", 1);

  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN || "http://localhost:5005",
    })
  );

 app.use(logger("dev"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

};
