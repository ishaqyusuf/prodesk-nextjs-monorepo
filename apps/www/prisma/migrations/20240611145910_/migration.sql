/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Customers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Customers` ADD COLUMN `slug` VARCHAR(255) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Customers_slug_key` ON `Customers`(`slug`);
