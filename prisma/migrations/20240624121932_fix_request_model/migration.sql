/*
  Warnings:

  - A unique constraint covering the columns `[userId,productId]` on the table `Request` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Request_userId_requestDate_key";

-- CreateIndex
CREATE UNIQUE INDEX "Request_userId_productId_key" ON "Request"("userId", "productId");
