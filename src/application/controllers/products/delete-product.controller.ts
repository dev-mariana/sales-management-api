import { DeleteProductService } from "@/domain/services/delete-product.service";
import { ProductsRepository } from "@/infra/database/prisma/repositories/products.repository";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteProduct(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteProductParams = z.object({
    id: z.string(),
  });

  const params = deleteProductParams.parse(request.params);

  try {
    const productsRepository = new ProductsRepository();
    const deleteProductsService = new DeleteProductService(productsRepository);

    await deleteProductsService.execute(params.id);

    return reply.code(204).send();
  } catch (error) {
    console.error(error);
    reply.code(500).send({ message: "Internal server error" });
  }
}
