/*
  Warnings:

  - You are about to drop the column `bookingDate` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "bookingDate",
DROP COLUMN "status";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT false;
