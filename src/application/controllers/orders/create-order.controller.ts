import { OrderStatus } from "@/domain/enum/order-status.enum";
import { CreateOrderService } from "@/domain/services/create-order.service";
import { OrdersRepository } from "@/infra/database/prisma/repositories/orders.repository";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createOrder(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createOrderBodySchema = z.object({
    requested_by: z.string(),
    status: z.enum([
      OrderStatus.PAID,
      OrderStatus.WAITING_PAYMENT,
      OrderStatus.PARTIAL_PAYMENT,
    ]),
    payment_date: z.coerce.date().optional(),
    total_amount: z.number(),
    items: z.array(
      z.object({
        quantity: z.number(),
        price: z.number(),
        product_id: z.string(),
      })
    ),
  });

  const body = createOrderBodySchema.parse(request.body);

  try {
    const ordersRepository = new OrdersRepository();
    const createOrderService = new CreateOrderService(ordersRepository);

    const orderId = await createOrderService.execute({
      requestedBy: body.requested_by,
      status: body.status as OrderStatus,
      paymentDate: body.payment_date,
      totalAmount: body.total_amount,
      items: body.items.map((item) => ({
        quantity: item.quantity,
        price: item.price,
        productId: item.product_id,
      })),
    });

    return reply.code(201).send({ id: orderId });
  } catch (error) {
    console.error(error);
    reply.code(500).send({ message: "Internal server error" });
  }
}
