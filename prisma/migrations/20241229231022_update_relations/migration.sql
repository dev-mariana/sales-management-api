/*
  Warnings:

  - Added the required column `product_id` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_order_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_item_id_fkey";

-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "product_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "payment_date" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
