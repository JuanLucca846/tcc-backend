/*
  Warnings:

  - Added the required column `coverImage` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" ADD COLUMN     "coverImage" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;
