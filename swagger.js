const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0", // standar open Api que estamos usando
    info: {
      title: "api para un ecommerce",
      version: "1.0.0",
      description: "API que sirve para crear una aplicación de venta online.",
    },
  },
  apis: ["./src/routes/user.routes.js", "./src/routes/product.routes.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("ContentType", "application/json");
    res.send(swaggerSpec);
  });

  console.log(
    `Documentación disponible en http://localhost:${port}/api/v1/docs`
  );
};

module.exports = swaggerDocs;
