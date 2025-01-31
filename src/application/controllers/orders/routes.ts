import type { FastifyInstance } from "fastify";
import { createOrder } from "./create-order.controller";

export async function ordersRoutes(app: FastifyInstance) {
  app.post("/orders", createOrder);
}
