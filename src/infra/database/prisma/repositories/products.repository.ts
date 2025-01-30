import type { CreateProductInput } from "@/domain/repositories/inputs/create-product-input";
import { UpdateProductInput } from "@/domain/repositories/inputs/update-product-input";
import type { IProductsRepository } from "@/domain/repositories/products.repository";
import type { Product } from "@prisma/client";
import { prisma } from "../index";

export class ProductsRepository implements IProductsRepository {
  async create(data: CreateProductInput): Promise<Product> {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        size: data.size,
        price: data.price,
        items: data?.items
          ? {
              connect: data.items.map((item) => ({
                id: item.id,
              })),
            }
          : undefined,
      },
    });

    return product;
  }

  async findMany(): Promise<Product[]> {
    const products = await prisma.product.findMany({
      include: {
        items: {
          select: {
            id: true,
          },
        },
      },
    });

    return products;
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        items: {
          select: {
            id: true,
          },
        },
      },
    });

    return product;
  }

  async update(id: string, data: UpdateProductInput): Promise<Product> {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data,
    });

    return product;
  }
}
