import { UpdateProductService } from "@/domain/services/update-product.service";
import { ProductsRepository } from "@/infra/database/prisma/repositories/products.repository";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateProduct(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateProductParams = z.object({
    id: z.string(),
  });

  const updateProductBodySchema = z.object({
    name: z.string(),
    size: z.string(),
    price: z.number(),
  });

  const params = updateProductParams.parse(request.params);
  const body = updateProductBodySchema.parse(request.body);

  try {
    const productsRepository = new ProductsRepository();
    const updateProductService = new UpdateProductService(productsRepository);

    const product = await updateProductService.execute(params.id, {
      name: body.name,
      size: body.size,
      price: body.price,
    });

    return reply.code(200).send(product);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ message: "Internal server error" });
  }
}
