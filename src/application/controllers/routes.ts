import type { FastifyInstance } from "fastify";
import { createOrder } from "./create-order.controller";
import { createProduct } from "./create-product.controller";
import { getProducts } from "./get-products.controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/orders", createOrder);
  app.post("/products", createProduct);
  app.get("/products", getProducts);
}
