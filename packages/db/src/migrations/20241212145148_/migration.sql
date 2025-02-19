/*
  Warnings:

  - A unique constraint covering the columns `[phoneNo]` on the table `Customers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Customers_phoneNo_key` ON `Customers`(`phoneNo`);
