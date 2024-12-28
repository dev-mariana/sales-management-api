import type { Order } from "@prisma/client";
import type { CreateOrderInput } from "./inputs/create-order-input";

export interface IOrdersRepository {
  create(data: CreateOrderInput): Promise<Order>;
}
