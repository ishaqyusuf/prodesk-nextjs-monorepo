/*
  Warnings:

  - A unique constraint covering the columns `[accountNo]` on the table `Customers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uniquePhone]` on the table `Customers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Customers_phoneNo_key` ON `Customers`;

-- AlterTable
ALTER TABLE `Customers` ADD COLUMN `accountNo` VARCHAR(255) NULL,
    ADD COLUMN `uniquePhone` VARCHAR(255) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Customers_accountNo_key` ON `Customers`(`accountNo`);

-- CreateIndex
CREATE UNIQUE INDEX `Customers_uniquePhone_key` ON `Customers`(`uniquePhone`);
