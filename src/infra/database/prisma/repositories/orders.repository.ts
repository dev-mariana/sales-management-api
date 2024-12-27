import type { IOrdersRepository } from "@/domain/repositories/orders.repository";
import type { Order, Prisma } from "@prisma/client";
import { prisma } from "../index";

export class OrdersRepository implements IOrdersRepository {
  async create(data: Prisma.OrderCreateInput): Promise<Order> {
    const order = await prisma.order.create({ data });

    return order;
  }
}
