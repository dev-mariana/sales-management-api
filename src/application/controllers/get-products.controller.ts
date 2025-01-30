import { GetProductsService } from "@/domain/services/get-products.service";
import { ProductsRepository } from "@/infra/database/prisma/repositories/products.repository";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function getProducts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const productsRepository = new ProductsRepository();
    const getProductsService = new GetProductsService(productsRepository);

    const products = await getProductsService.execute();

    return reply.code(200).send(products);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ message: "Internal server error" });
  }
}
