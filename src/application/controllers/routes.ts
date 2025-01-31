import type { FastifyInstance } from "fastify";
import { createOrder } from "./orders/create-order.controller";
import { createProduct } from "./products/create-product.controller";
import { deleteProduct } from "./products/delete-product.controller";
import { getProduct } from "./products/get-product.controller";
import { getProducts } from "./products/get-products.controller";
import { updateProduct } from "./products/update-product.controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/orders", createOrder);
  app.post("/products", createProduct);
  app.get("/products", getProducts);
  app.get("/products/:id", getProduct);
  app.patch("/products/:id", updateProduct);
  app.delete("/products/:id", deleteProduct);
}
