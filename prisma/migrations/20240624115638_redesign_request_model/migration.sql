/*
  Warnings:

  - You are about to drop the column `cartId` on the `Request` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productQuantity` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_cartId_fkey";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "cartId",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "productQuantity" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
