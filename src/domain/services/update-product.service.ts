import type { ProductsRepository } from "@/infra/database/prisma/repositories/products.repository";
import { Product } from "@prisma/client";
import { UpdateProductRequest } from "./interfaces/update-product-request";

export class UpdateProductService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(id: string, data: UpdateProductRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new Error("Product not found.");
    }

    const updatedProduct = await this.productsRepository.update(id, {
      name: data.name,
      size: data.size,
      price: data.price,
    });

    return updatedProduct;
  }
}
