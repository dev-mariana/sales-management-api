import type { ProductsRepository } from "@/infra/database/prisma/repositories/products.repository";
import type { CreateProductRequest } from "./interfaces/create-product-request";

export class CreateProductService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(data: CreateProductRequest): Promise<string> {
    const { id } = await this.productsRepository.create({
      name: data.name,
      size: data.size,
      price: data.price,
      items: data.items,
    });

    return id;
  }
}
