const supertest = require("supertest");
const { set } = require("../app");
const app = require("../app");
const { Product } = require("../models");
const server = require("../server");
const db = require("../utils/database");
const api = supertest(app);
const token =
  " Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVsaW90cyIsImVtYWlsIjoiZWxpb3Rzc2FsYXphcmNhbXBvc0BnbWFpbC5jb20iLCJpZCI6NCwiaWF0IjoxNjY5OTQyMzIyLCJleHAiOjE2Njk5NjAzMjJ9.v-jvCMdia9dLirueHRzRJ0ZDO-uVFRgjUuwi58-ne8kgQezUhM7GvTbH_Ia_Y6DLbcK9LG-de1ValwO5AavqGQ";

describe("pruebas para el endpoint products", () => {
  test("probar que un get a products devuelve un json", async () => {
    await api
      .get("/api/v1/products")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("probar que un get a products devuelve un arreglo", async () => {
    const { body } = await api.get("/api/v1/products");
    expect(body).toBeInstanceOf(Array);
  });

  test("probar que un producto se crea", async () => {
    const product = {
      name: "campera",
      price: 10.5,
      availableQty: 10,
      status: true,
      userId: 1,
    };
    await api
      .post("/api/v1/products")
      .set({ Authorization: token })
      .send(product)
      .expect(201);
  });
  test("probar que un producto se agrega al carrito", async () => {
    const data = {
      id: 1,
      quantity: 3,
    };
    await api
      .post("/api/v1/products/add")
      .set({ Authorization: token })
      .send(data)
      .expect(200);
  });
});

afterAll(async () => {
  await Product.destroy({ where: { name: "campera" } });
  server.close();
  db.close();
});
