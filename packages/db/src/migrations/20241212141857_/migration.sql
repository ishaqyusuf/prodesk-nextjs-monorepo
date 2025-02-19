/*
  Warnings:

  - A unique constraint covering the columns `[phoneNo]` on the table `Customers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX `AddressBooks_phoneNo_idx` ON `AddressBooks`(`phoneNo`);

-- CreateIndex
CREATE UNIQUE INDEX `Customers_phoneNo_key` ON `Customers`(`phoneNo`);

-- CreateIndex
CREATE INDEX `Customers_phoneNo_idx` ON `Customers`(`phoneNo`);
