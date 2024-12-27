import type { Order, Prisma } from "@prisma/client";

export interface IOrdersRepository {
  create(data: Prisma.OrderCreateInput): Promise<Order>;
}
