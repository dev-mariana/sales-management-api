import type { FastifyInstance } from "fastify";
import { createProduct } from "./create-product.controller";
import { deleteProduct } from "./delete-product.controller";
import { getProduct } from "./get-product.controller";
import { getProducts } from "./get-products.controller";
import { updateProduct } from "./update-product.controller";

export async function productsRoutes(app: FastifyInstance) {
  app.post("/products", createProduct);
  app.get("/products", getProducts);
  app.get("/products/:id", getProduct);
  app.patch("/products/:id", updateProduct);
  app.delete("/products/:id", deleteProduct);
}
