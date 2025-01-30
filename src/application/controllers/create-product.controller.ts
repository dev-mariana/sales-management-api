import { CreateProductService } from "@/domain/services/create-product.service";
import { ProductsRepository } from "@/infra/database/prisma/repositories/products.repository";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createProduct(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createProductBodySchema = z.object({
    name: z.string(),
    size: z.string(),
    price: z.number(),
    items: z
      .array(
        z.object({
          id: z.string(),
        })
      )
      .optional(),
  });

  const body = createProductBodySchema.parse(request.body);

  try {
    const productsRepository = new ProductsRepository();
    const createProductService = new CreateProductService(productsRepository);

    const productId = await createProductService.execute({
      name: body.name,
      size: body.size,
      price: body.price,
      items: body.items,
    });

    return reply.code(201).send({ id: productId });
  } catch (error) {
    console.error(error);
    reply.code(500).send({ message: "Internal server error" });
  }
}
