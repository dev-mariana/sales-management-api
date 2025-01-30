import type { ProductsRepository } from "@/infra/database/prisma/repositories/products.repository";

export class DeleteProductService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(id: string): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new Error("Product not found.");
    }

    await this.productsRepository.delete(id);
  }
}
