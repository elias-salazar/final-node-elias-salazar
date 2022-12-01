const express = require("express");
const db = require("./utils/database");
const handleError = require("./middlewares/error.middleware");
const initModels = require("./models/initModels");
const { userRoutes, authRoutes, productRoutes } = require("./routes");
const transporter = require("./utils/mailer");
const app = express();

app.use(express.json());

initModels();
db.authenticate()
  .then(() => console.log("Autenticacion exitosa"))
  .catch((error) => console.log(error));

db.sync({ force: false })
  .then(() => console.log("base de datos sincronizada"))
  .catch((error) => console.log(error));

transporter
  .verify() // devuelve una promesa
  .then(() => console.log("listos para enviar correos"));
app.get("/", (req, res) => {
  console.log("bienvenido al server");
});

app.use("/api/v1", userRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", productRoutes);

app.use(handleError);

module.exports = app;
