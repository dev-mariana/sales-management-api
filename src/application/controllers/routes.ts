import type { FastifyInstance } from "fastify";
import { createOrder } from "./create-order.controller";
import { createProduct } from "./create-product.controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/orders", createOrder);
  app.post("/products", createProduct);
}
