import type { OrderStatus } from "@/domain/enum/order-status.enum";

export interface CreateOrderInput {
  requestedBy: string;
  status: OrderStatus;
  paymentDate?: Date | string;
  totalAmount: number;
  items: {
    quantity: number;
    price: number;
    product: string;
  }[];
}
