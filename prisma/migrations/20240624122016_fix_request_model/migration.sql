/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Request` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Request_userId_productId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Request_userId_key" ON "Request"("userId");
