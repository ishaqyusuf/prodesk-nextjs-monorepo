/*
  Warnings:

  - A unique constraint covering the columns `[orderId,type]` on the table `SalesOrders` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `SalesOrders_orderId_key` ON `SalesOrders`;

-- CreateIndex
CREATE UNIQUE INDEX `SalesOrders_orderId_type_key` ON `SalesOrders`(`orderId`, `type`);
