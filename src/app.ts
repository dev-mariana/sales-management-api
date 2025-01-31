import fastify from "fastify";
import { ZodError } from "zod";
import { ordersRoutes } from "./application/controllers/orders/routes";
import { productsRoutes } from "./application/controllers/products/routes";

export const app = fastify();

app.register(productsRoutes, { prefix: "/api" });
app.register(ordersRoutes, { prefix: "/api" });

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.format(),
    });
  }

  return reply.status(500).send({ message: "Internal server error." });
});
