const supertest = require("supertest");
const app = require("../app");
const { User } = require("../models");
const server = require("../server");
const db = require("../utils/database");
const api = supertest(app);
const token =
  "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hcsOtYSIsImVtYWlsIjoibWFyaWFAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTY2OTk0NzUwMCwiZXhwIjoxNjY5OTY1NTAwfQ.I03dInd90utCzm7wun2xHcDv2YN-ypUlzMlATLD12weefCShyCn726Rq3M3Q566UU4DGcfV0kGjFu2VNNVQKsg";
describe("pruebas para el endpoint user", () => {
  test("probar que un user se crea", async () => {
    const user = {
      username: "tom",
      email: "tom@gmail.com",
      password: "1234",
    };
    await api.post("/api/v1/users").send(user).expect(201);
  });

  test("probar que el usuario obtiene su carrito con productos", async () => {
    await api
      .get("/api/v1/users/1/cart")
      .set({ Authorization: token })
      .expect(200);
  });
  test("probar que un usuario obtiene las ordenes de compra", async () => {
    await api
      .post("/api/v1/users/1/orders")
      .set({ Authorization: token })
      .expect(200);
  });
  test("probar que un usuario compra el carrito", async () => {
    await api
      .post("/api/v1/users/1/cart")
      .set({ Authorization: token })
      .expect(200);
  });
});
afterAll(async () => {
  await User.destroy({ where: { email: "tom@gmail.com" } });
  server.close();
  db.close();
});
