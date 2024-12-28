import type { CreateOrderInput } from "@/domain/repositories/inputs/create-order-input";
import type { IOrdersRepository } from "@/domain/repositories/orders.repository";
import type { Order } from "@prisma/client";
import { prisma } from "../index";

export class OrdersRepository implements IOrdersRepository {
  async create(data: CreateOrderInput): Promise<Order> {
    const order = await prisma.order.create({
      data: {
        requested_by: data.requestedBy,
        status: data.status,
        payment_date: data?.paymentDate,
        total_amount: data.totalAmount,
        items: {
          create: data.items?.map((item) => ({
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return order;
  }
}
