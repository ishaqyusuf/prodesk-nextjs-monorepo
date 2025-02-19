/*
  Warnings:

  - You are about to drop the column `uniquePhone` on the `Customers` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Customers_uniquePhone_key` ON `Customers`;

-- AlterTable
ALTER TABLE `Customers` DROP COLUMN `uniquePhone`;
