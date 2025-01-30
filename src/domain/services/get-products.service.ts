import type { ProductsRepository } from "@/infra/database/prisma/repositories/products.repository";
import { Product } from "@prisma/client";

export class GetProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(): Promise<Product[]> {
    const products = await this.productsRepository.findMany();

    return products;
  }
}
