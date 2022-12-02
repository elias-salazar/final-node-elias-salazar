const app = require("./app");
require("dotenv").config();
const swaggerDocs = require("../swagger");

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto ${PORT}`);
  swaggerDocs(app, PORT);
});
module.exports = server;
