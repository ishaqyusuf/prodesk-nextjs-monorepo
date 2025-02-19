-- DropIndex
DROP INDEX `SalesOrders_deletedAt_orderId_grandTotal_prodId_type_idx` ON `SalesOrders`;

-- CreateIndex
CREATE INDEX `SalesOrders_deletedAt_orderId_grandTotal_prodId_type_prodDue_idx` ON `SalesOrders`(`deletedAt`, `orderId`, `grandTotal`, `prodId`, `type`, `prodDueDate`);
