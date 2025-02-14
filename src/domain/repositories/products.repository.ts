import type { Product } from "@prisma/client";
import type { CreateProductInput } from "./inputs/create-product-input";
import { UpdateProductInput } from "./inputs/update-product-input";

export interface IProductsRepository {
  create(data: CreateProductInput): Promise<Product>;
  findMany(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  update(id: string, data: UpdateProductInput): Promise<Product>;
  delete(id: string): Promise<void>;
}
