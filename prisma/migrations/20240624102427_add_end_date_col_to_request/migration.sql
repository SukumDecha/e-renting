/*
  Warnings:

  - Added the required column `returnDate` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "returnDate" TIMESTAMP(3) NOT NULL;
