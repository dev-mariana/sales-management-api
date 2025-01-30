import type { FastifyInstance } from "fastify";
import { createOrder } from "./create-order.controller";
import { createProduct } from "./create-product.controller";
import { deleteProduct } from "./delete-product.controller";
import { getProduct } from "./get-product.controller";
import { getProducts } from "./get-products.controller";
import { updateProduct } from "./update-product.controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/orders", createOrder);
  app.post("/products", createProduct);
  app.get("/products", getProducts);
  app.get("/products/:id", getProduct);
  app.patch("/products/:id", updateProduct);
  app.delete("/products/:id", deleteProduct);
}
