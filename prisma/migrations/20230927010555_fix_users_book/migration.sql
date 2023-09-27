/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "cover" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "cpf" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");
