import { GetProductService } from "@/domain/services/get-product.service";
import { ProductsRepository } from "@/infra/database/prisma/repositories/products.repository";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getProduct(request: FastifyRequest, reply: FastifyReply) {
  const getProductParams = z.object({
    id: z.string(),
  });

  const params = getProductParams.parse(request.params);

  try {
    const productsRepository = new ProductsRepository();
    const getProductsService = new GetProductService(productsRepository);

    const products = await getProductsService.execute(params.id);

    return reply.code(200).send(products);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ message: "Internal server error" });
  }
}
