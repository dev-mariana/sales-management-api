import type { ProductsRepository } from "@/infra/database/prisma/repositories/products.repository";
import { Product } from "@prisma/client";

export class GetProductService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(id: string): Promise<Product | null> {
    const product = await this.productsRepository.findById(id);

    return product;
  }
}
