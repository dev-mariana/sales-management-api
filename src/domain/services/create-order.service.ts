import type { OrdersRepository } from "@/infra/database/prisma/repositories/orders.repository";
import type { CreateOrderRequest } from "./interfaces/create-order-request";

export class CreateOrderService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async execute(data: CreateOrderRequest): Promise<string> {
    const { id } = await this.ordersRepository.create({
      requestedBy: data.requestedBy,
      status: data.status,
      paymentDate: data?.paymentDate,
      totalAmount: data.totalAmount,
      items: data.items,
    });

    return id;
  }
}
